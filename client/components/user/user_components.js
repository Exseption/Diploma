angular.module('ws')
    .directive('myQuestions', function (QuestionService, SessionManager, $mdDialog) {
        return {
            templateUrl:'components/user/my_questions/my_questions.html',
            link: function (scope) {
                var id = SessionManager.person.id;
                QuestionService.getMyQuestions(id).then(function (my_questions) {
                    scope.my_questions = my_questions;
                });
                scope.edit_question = function (question) {
                    $mdDialog.show({
                        templateUrl:"components/user/my_questions/edit-question.html",
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
    })

    .directive('myDialogs', function (DialogService,SessionManager) {
        return {
            templateUrl: 'components/user/my_messages/my_messages.html',
            link: function (scope) {
                DialogService.getDialogs(SessionManager.person.id).then(function (dialogs) {
                    scope.dialogs = dialogs;
                });
                DialogService.getDialogMessages(SessionManager.person.id, 1).then(function (messages) {
                    scope.messages = messages;
                })
            }
        }
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
           templateUrl:'components/user/my_settings/my_settings.html',
           link: function (scope) {


               // scope.person.birthday = new Date(scope.person.birthday);
               Opts.getOpts(SessionManager.person.id).then(function (opts) {
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
                    }, function (error) {
                        Materialize.toast('Ошибка сохранения данных!', 3000)
                    })
               }

           }
       }
    })