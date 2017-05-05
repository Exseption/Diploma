angular.module('ws')
    .directive('myQuestions', function (QuestionService, SessionManager, $mdDialog) {
        return {
            template:`

<div>
    
    <div class="view-cntr">
    <div class="row valign-wrapper cyan lighten-3" style="padding: 10px 0">
<div class="col s10"><b>МОИ ВОПРОСЫ</b></div>
<div class="col s2 right-align">
<a ask class="btn-floating waves-effect waves-circle green"><i class="material-icons">message</i></a>
</div>
</div>
    <div class="blue lighten-5 question-table-header" >Активные вопросы</div>
    <table class="highlight">
        <thead>
        <tr>
            <th>#</th>
            <th>Заголовок</th>
            <th>Дата публикации</th>
            <th class="left-align">Ответов</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="mq in my_questions | filter: { closed: false }">
            <td>{{$index + 1}}.</td>
            <td ng-bind="mq.title" ng-click="edit_question(mq)" style="cursor: pointer; outline: none"></td>
            <td ng-bind="mq.created | amUtc | amLocal | amDateFormat:'LLL'"></td>
            <td><a class="you_may_click_here"><span class="new badge red">{{mq.answers.length}}</span></a></td>
        </tr>
        </tbody>
    </table>
    <div class="blue lighten-5 question-table-header">Закрытые вопросы</div>
    <table class="highlight">
        <thead>
        <tr>
            <th>#</th>
            <th>Заголовок</th>
            <th>Дата публикации</th>
            <th class="right-align">Ответов</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="mq in my_questions | filter: { closed: true }">
            <td>{{$index + 1}}.</td>
            <td ng-bind="mq.title" ng-click="edit_question(mq)" style="cursor: pointer; outline: none"></td>
            <td ng-bind="mq.created | amUtc | amLocal | amDateFormat:'LLL'"></td>
            <td><a class="you_may_click_here"><span class="new badge red">{{mq.answers.length}}</span></a></td>
        </tr>
        </tbody>
    </table>
</div>
    
</div>`,
            link: function (scope) {
                var id = SessionManager.person.id;
                QuestionService.getMyQuestions(id).then(function (my_questions) {
                    scope.my_questions = my_questions;
                });
                scope.edit_question = function (question) {
                    $mdDialog.show({
                        template:`<div class="row">
    <form name="FormQuestionEdit" class="col s12">
        <div class="section form-title center-align">
            Редактирование вопроса
        </div>
        <div class="input-field col s8">
                <legend>Заголовок</legend>
                <input id="question_title" type="text" ng-model="question.title" name="title"/>
        </div>

        <div class="input-field col s2">
            <legend>Дата создания</legend>
            <input disabled type="date" class="datepicker" ng-model="question.created"/>
        </div>

        <div class="input-field col s2">
                <legend>Закрыт</legend>
                <input type="checkbox" id="closed" ng-model="question.closed" name="closed">
                <label for="closed" style="min-width: 94px; min-width: 94px">{{question.closed | true_false}}</label>
        </div>

        <div class="input-field col s12">
                <legend>Содержимое вопроса</legend>
                <textarea class="materialize-textarea" ng-model="question.body" name="body"></textarea>
        </div>

            <div class="input-field col s2">
                <input id="pay" type="checkbox" ng-model="question.payable" name="payable" ng-change="question.price = ''"/>
                <label style="min-width: 122px; max-width: 122px" for="pay">{{question.payable | pay_free}}</label>
            </div>
            <div class="input-field col s2">
                <legend>Цена, руб.</legend>
                <input id="money" type="text" ng-model="question.price" ng-disabled="question.payable !== true" name="money">
            </div>

        <div class="col s12 section" style="padding-bottom: 20px">
            <div class="divider" style="margin-bottom: 10px"></div>
            <legend>Ответы</legend>
            <div class="input-field" ng-repeat="ans in question.answers">
                <div>{{$index + 1}}. {{ans.body}} (<span ui-sref="person({id: ans.person.id})" style="cursor: pointer; outline: none" ng-click="cancel_edit()"><b>{{ans.person.name}} {{ans.person.surname}}/{{ans.created | amUtc | amLocal | amDateFormat: 'LLL'}}</b></span>)</div>
            </div>
        </div>
        <div class="modal-footer right-align col s12 section" >
            <a class="waves-light btn" ng-click="cancel_edit()">Отмена</a>
            <a id="save_btn" class="waves-light btn" ng-disabled="FormQuestionEdit.$pristine" ng-click="save_question_changes(question.title, question.body, question.closed, question.payable, question.price)">Сохранить</a>
        </div>
    </form>
</div>
`,
                        controller: function ($scope) {
                            $scope.question = question;
                            $scope.question.created = new Date($scope.question.created);

                            $scope.cancel_edit = function () {
                                $mdDialog.hide();
                            };
                            $scope.save_question_changes = function(title, body, closed, payable, money){
                                QuestionService.save_question_changes(title, body, closed, payable, money, question.id).then(function (success) {
                                    Materialize.toast('Вопрос успешно изменен!', 5000);
                                    $mdDialog.hide();
                                }, function (error) {
                                    Materialize.toast('Ошибка!', 5000);
                                })
                            }
                        },
                        parent: angular.element(document.body),
                        clickOutsideToClose:true
                    })
                }
            }

        }
    })
    .service('DialogService', function (Restangular) {
        const self = this;
        self.getDialogs = function (id) {
            return Restangular.one('person', id).customGET('dialogs');
        };
        self.getDialogMessages = function (id, dialogId) {
            return Restangular.one('person',id).one('dialog', dialogId).customGET('messages');
        };
        self.send_message = function (message, dialogId, sended_by) {
           return Restangular.all('dialog/send_message').post({
               body: message,
               of_dialog: dialogId,
               sended_by : sended_by
           })
        }
    })

    .directive('myDialogs', function (DialogService, SessionManager, $rootScope) {
        return {
            template: `
<div class="dialog_sublist_container">
 <a class="valign-wrapper dialogs-sublist" ng-repeat="dialog in dialogs" ui-sref="my_messages({dialogId: dialog.id })" ui-sref-active="active">{{dialog.caption}}</a>
</div>     
`,
            link: function (scope) {
                scope.loadDialogs = function () {
                    DialogService.getDialogs(SessionManager.person.id).then(function (dialogs) {
                        scope.dialogs = dialogs;
                    });
                };
                scope.loadDialogs();
                $rootScope.$on('dialog_deleted', function (event, data) {
                  scope.loadDialogs();
                });
                $rootScope.$on('dialog_renamed', function (event, data) {
                    scope.loadDialogs();
                })
            }
        }
    })

    .directive('createDialog', function (Restangular, SessionManager, $stateParams, $state) {
        return {
            link: function (scope, element) {
                const sender = SessionManager.person.id;
                const destination = $stateParams.id;
                element.on('click', function () {
                    return Restangular.all('dialog/create').post({
                        caption: 'Диалог ' + moment(new Date).format('LLL'),
                        sender: sender,
                        destination: destination
                    }).then(function (result) {
                        console.log(result);
                        Materialize.toast('Диалог с пользователем успешно создан!', 2000);
                        $state.go('my_dialogs');
                    }, function (err) {
                        console.log(err);
                    })
                });
            }
        }
    })
    .directive('renameDialog', function (Restangular, $stateParams, $rootScope, $mdDialog) {
        return {
            link: function (scope, element) {
                let dialogId = $stateParams.dialogId;
                element.on('click', function () {
                    $mdDialog.show(
                        $mdDialog.prompt()
                        .title('Переименовать диалог')
                        .textContent('Введите новое название диалога')
                        .placeholder('Название')
                        .ok('Переименовать')
                        .cancel('Отмена')).then(function (result) {
                        return Restangular.all('dialog/rename').post({
                            id: dialogId,
                            caption: result
                        }).then(function (success) {
                            $rootScope.$emit('dialog_renamed', {});
                        })
                    }, function (cancel) {
                        console.log('Canceled!')
                    })
                });
            }
        }
    })
    .directive('deleteDialog', function (Restangular, $stateParams, $rootScope, $state, $mdDialog) {
        return {
            link: function (scope, elem) {
                let dialogId = $stateParams.dialogId;
                elem.on('click', function () {
                    $mdDialog.show(
                        $mdDialog.confirm()
                            .title('Удаление диалога')
                            .textContent('Вы действительно хотите удалить этот диалог?')
                            .ok('ОК')
                            .cancel('Отмена') 
                    ).then(function () {
                        return Restangular.one('dialog/delete', dialogId).remove().then(function () {
                            Materialize.toast('Диалог успешно удален!', 3000);
                            $rootScope.$emit('dialog_deleted', { id: dialogId });
                            $state.go('my_messages')
                        }, function (err) {
                            console.log(err);
                        })
                    }, function () {
                        console.log('canceled!');
                    });

                })
            }
        }
    })

    .directive('myMessages', function (DialogService, SessionManager, $stateParams, $rootScope) {
        return {
            template: `
<div class="row valign-wrapper cyan lighten-3" style="padding: 10px 0" ng-show="messages">
<div class="col s10"><b>{{messages.caption | uppercase}}, {{messages.started | amUtc | amLocal | amDateFormat: 'LLL' }}</b></div>
<div class="col s2 right-align">
<a rename-dialog class="btn-floating waves-effect waves-circle green"><i class="material-icons">create</i></a>
<a delete-dialog class="btn-floating red"><i class="material-icons fix_icons_align">delete_forever</i></a>
</div>
</div>

<div style="padding: 5px 9px;">
    <div style="min-height: 500px; max-height: 500px; overflow-y: scroll">
        <div ng-repeat="m in messages.messages">
            <div class="row col s12">
                <div ng-class="{'right-align': (m.person.name === my_name) && (m.person.surname === my_surname)}">
                    <span class="teal lighten-5" style="padding: 5px 8px; border-radius: 5px;">
                        <b><span class="you_may_click_here" ui-sref="person({id: m.person.id})" ng-hide="(my_name === m.person.name) && (my_surname === m.person.surname)">{{m.person.name}} {{m.person.surname}},</span> {{m.created | amUtc | amLocal | amDateFormat:'LLL' }}</b>
                    </span>
                    <div class="col s12" style="margin-top: 5px">{{m.body}}</div>
                </div>
            </div>
        </div>
    </div>
<div class="row section">
    <form name="FormDialog" class="col s12">
        <div class="input-field col s11">
            <input ng-model="_message" id="message" type="text" class="input" my-enter="send_message(_message)">
            <label for="message">Ваше сообщение</label>
        </div>
        <div class="input-field">
            <a class="btn-floating waves-effect waves-circle" ng-click="send_message(_message)"><i class="material-icons">send</i></a>  
        </div>
    </form>
</div>
</div>`,
            link: function (scope) {
                scope.my_name = SessionManager.person.name;
                scope.my_surname = SessionManager.person.surname;
                const dialogId = $stateParams.dialogId;
                const sended_by = SessionManager.person.id;
                scope.load_messages = function () {
                    DialogService.getDialogMessages(SessionManager.person.id, dialogId ).then(function (messages) {
                        scope.messages = messages;
                    })
                };

                scope.send_message = function (message) {
                    DialogService.send_message(message, dialogId, sended_by).then(function (success) {
                        console.log(success);
                        scope._message = '';
                        scope.load_messages();
                    });
                };
                scope.load_messages();
                $rootScope.$on('dialog_renamed', function () {
                    scope.load_messages();
                });
            }
        }
    })

    .directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });
                    scope._message = '';
                    event.preventDefault();
                }
            });
        };
    })

    .service('Opts', function (Restangular) {
        var self = this;
        self.getOpts = function (userId) {
            return Restangular.one('opts', userId).get();
        };
        self.save_options_changes = function (telephone, email, userId) {
            return Restangular.all('opts/save_changes').post({
                telephone: telephone,
                email: email,
                userId: userId
                })
        };
        self.save_user_details = function (name, surname, telephone, email, country, area, city, id) {
            return Restangular.all('user/details').post({
                name: name,
                surname: surname,
                telephone: telephone,
                email: email,
                country: country,
                area: area,
                city: city,
                id: id
            })
        }
    })
    .directive('mySettings', function (Opts, SessionManager) {
       return {
           controller: function ($scope) {
               $scope.person = SessionManager.person;
               $scope.person.birthday = new Date($scope.person.birthday);
           },
           template:`<div class="view-cntr">
<div class="row valign-wrapper cyan lighten-3" style="padding: 10px 0">
<div class="col s12"><b>{{'настройки пользователя' | uppercase}}</b></div>
<div class="col s2 right-align">
<a style="visibility: hidden;" class="btn-floating waves-effect waves-circle green"><i class="material-icons">help_outline</i></a>
</div>
</div>
    <form name="FormUserOptions">
        <fieldset>
            <legend>Общие настройки</legend>
            <div class="row">
                <div class="col s1 pt-label">
                    Имя
                </div>
                <div class="col s3">
                    <input name="name" type="text" ng-model="name" ng-value="person.name">
                </div>
                <div class="col s1 pt-label">
                    Фамилия
                </div>
                <div class="col s3">
                    <input name="surname" type="text" ng-value="person.surname" ng-model="surname">
                </div>

            </div>
            <div class="row">
                <div class="col s1 pt-label">
                    Телефон
                </div>
                <div class="col s3">
                    <input name="telephone" type="text" ng-value="person.telephone" ng-model="telephone">
                </div>

                <div class="col s1 pt-label">
                    Дата рождения
                </div>
                <div class="col s3">
                    <input type="date" name="birthday" ng-value="person.birthday" ng-model="birthday">
                </div>
            </div>
            <div class="row">
                <div class="col s1 pt-label">
                    Страна
                </div>
                <div class="col s3">
                    <input type="text" ng-value="person.country" ng-model="country">
                </div>
                <div class="col s1 pt-label">
                    Область, край
                </div>
                <div class="col s3">
                    <input type="text" ng-value="person.area" ng-model="area">
                </div>
                <div class="col s1 pt-label">
                    Город
                </div>
                <div class="col s3">
                    <input type="text" ng-value="person.city" ng-model="city">
                </div>
            </div>
            <div class="section right-align">

                <a class="btn" ng-click="test(name)" ng-disabled="FormUserOptions.$pristine">Сохранить</a>
            </div>
        </fieldset>
    </form>
    <fieldset>
        <legend>Настройки приватности</legend>
        <form name="FormPrivate">
            <div class="row">
                <div class="col s3">Показывать телефон</div>
                <div class="col s1">
                    <input id="tel" type="checkbox" class="filled-in" ng-model="opts.show_telephone" name="telephone">
                    <label for="tel"></label>
                </div>
            </div>
            <div class="row">
                <div class="col s3">Показывать <a style="cursor: pointer" class="tooltipped" data-position="top" data-delay="50" data-tooltip="Ваш e-mail: {{person.email}}">E-mail</a></div>
                <div class="col s1">
                    <input id="email" class="filled-in" type="checkbox" ng-model="opts.show_email" name="email"/>
                    <label for="email"></label>
                </div>
            </div>
            <div class="section right-align">
                <a ng-disabled="FormPrivate.$pristine" class="waves-effect btn" ng-click="save_options_changes(opts.show_telephone, opts.show_email)">Сохранить</a>
            </div>
        </form>
    </fieldset>
</div>`,
           link: function (scope) {
               // scope.person.birthday = new Date(scope.person.birthday);
               Opts.getOpts(SessionManager.person.id).then(function (opts) {
                   $('.tooltipped').tooltip({delay: 50});
                   scope.opts = opts;
               });
               scope.save_options_changes = function (telephone, email) {
                   Opts.save_options_changes(telephone, email, SessionManager.person.id).then(function (success) {

                       Materialize.toast('Настройки приватности изменены!', 5000);
                   })
               };
               scope.test = function () {
                   if(!scope.name){
                       scope.name = scope.person.name;

                   }
                   if(!scope.surname){
                       scope.surname = scope.person.surname;
                   }
                   if(!scope.telephone){
                       scope.telephone = scope.person.telephone;
                   }
                   if(!scope.email){
                       scope.email = scope.person.email;
                   }
                   if(!scope.country){
                       scope.country = scope.person.country;
                   }
                   if(!scope.area){
                       scope.area = scope.person.area;
                   }
                   if(!scope.city){
                       scope.city = scope.person.city;
                   }

                    Opts.save_user_details(
                        scope.name,
                        scope.surname,
                        scope.telephone,
                        scope.email,
                        scope.country,
                        scope.area,
                        scope.city,
                        scope.person.id
                    ).then(function (success) {
                        Materialize.toast('Общие настройки сохранены изменены!', 3000)
                        SessionManager.auth(SessionManager.person.login, SessionManager.person.password, true);

                    }, function (error) {
                        Materialize.toast('Ошибка сохранения данных!', 3000)
                    })
               }

           }
       }
    })