angular.module('ws')
    .directive('svAnswers', function (AnswerService) {
        return {
            template: `
<page-struct-template>
<title-here>
Управление ответами
</title-here>
<content-here>
<table class="highlight">
        <thead>
          <tr>
              <th>#</th>
              <th>Ответ</th>
              <th>Оценка</th>
              <th>Автор</th>
              <th>Дата создания</th>
              <th>Блокировка</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="item in answers">
            <td>{{ $index + 1 }}</td>
            <td style="max-width: 30vw">{{item.body}}</td>
            <td>
            {{item.mark}}
            </td>
            <td>{{item.person.name}} {{item.person.surname}}</td>
            <td>{{item.created | amUtc | amLocal | amDateFormat: 'LLL'}}</td>
            <td class="center-align"><input type="checkbox" class="filled-in" ng-checked="item.blocked" id="block{{$index}}"><label for="block{{$index}}"></label> </td>
          </tr>
        </tbody>
      </table>
</content-here>
</page-struct-template>
`,
            link: function (scope) {
                AnswerService.getAnswers().then(function (answers) {
                    scope.answers = answers;
                })
            }
        }
    })
    .directive('svPages', function () {
        return {
            template: `
<page-struct-template>
<title-here>Управление разделами и страницами</title-here>
<content-here>
<div class="col s2">
<a class="adm_pages" ui-sref="sv_pages.adm_news" ui-sref-active="active">НОВОСТИ</a>
<a class="adm_pages" ui-sref="sv_pages.adm_help" ui-sref-active="active">СПРАВКА</a>
<a class="adm_pages" ui-sref="sv_pages.adm_about" ui-sref-active="active">О НАС</a>
</div>
<div class="col s10">
        <div ui-view></div>
</div>
</content-here>
</page-struct-template>
`
        }
    })
    .directive('aboutUs', function (Restangular) {
        return {
            template: `
            <div class="section">
                <div class="row">
                    <div class="col s12">
                        <form name="FormAbout">
                        <h5>Приветствие и текст</h5>
                        <div class="input-field">
                            <textarea id="title" class="materialize-textarea validate" required ng-model="hello" ng-value="title"></textarea>
                            <label for="title">Заголовок, приветствие</label>            
                        </div>
                        <div class="input-field">
                            <textarea id="about" class="materialize-textarea validate" required ng-model="about" ng-value="aboutUs"></textarea>
                            <label for="about">Общий текст о веб-сервисе</label>            
                        </div>
                        <h5>Контакты</h5>
                        <div class="input-field">
                            <input type="text" id="developer" class="validate" required ng-model="developer" ng-value="dev">
                            <label for="developer">ФИО разработчика</label>            
                        </div>
                        <div class="input-field">
                            <input id="contacts" class="validate" required ng-model="link" ng-value="contact" type="text">
                            <label for="contacts">Ссылка на github, VK и др</label>            
                        </div>
                        <div class="right-align">
                        <input ng-disabled="FormAbout.$invalid" type="button" class="btn" value="Сохранить" ng-click="save()">
</div>
            </form>
        </div>
    </div>
</div>
`,
            link: function (scope, elem) {
                    Restangular.all('about').get().then(function (data) {
                        scope.data = data;
                    });
                scope.title = 'Добро пожаловать на веб-сервис! Здесь мы можете найти ответы на интересующие вас правовые вопросы!';
                scope.aboutUs = 'Данный проект является выпускной квалификационной работой студента Физико-математического факультета БГПУ г. Благовещенск в 2017 году Налимова Игоря.';
                scope.dev = 'Налимов Игорь';
                scope.contact = 'brain5ur9ery@gmail.com';
                scope.save = function () {
                    Restangular.all('about').post({
                        hello: scope.hello,
                        about: scope.about,
                        developer: scope.developer,
                        link: scope.link,
                    }).then(function (results) {
                        Materialize.toast('Сохранено!', 2000);
                        [scope.hello, scope.about, scope.developer, scope.link] = '';
                    }, function(err){
                        Materialize.toast('Ошибка!', 2000);
                    })
                }
            }
        }
    })
    .directive('helpList', function ($mdDialog, Restangular) {
        return {
            template: `
            <h5>{{section}}</h5>
                    <div ng-repeat="item in arr | filter: {section: section}">
                        <div class="section blue-grey lighten-5" style="padding: 5px 10px; margin-bottom: 5px"> 
                            <div style="text-transform: uppercase; font-weight: bold; color:green">{{item.title}}
                            </div>
                            <div style="padding-left: 10px">
                            {{item.content}}<div class="right-align"><a ng-click="updateHelp(item)" class="you_may_click_here">Редактировать</a></div>
                            </div>
                        </div>
                    </div>   
                    <div class="right-align">
                    <a ng-click="createHelp(section)" class="btn-floating"><i class="material-icons">add</i></a></i>                    
</div>
            `,
            scope: {
                section: '@',
                arr : '<'
            },
            link: function (scope) {
                scope.createHelp = function (section) {

                };
                scope.updateHelp = function (help) {
                    $mdDialog.show({
                        template: `
                        <div class="row" style="min-width: 20vw">
                        <div class="col s12">
                        <div>
                        <div class="form-title">Редактирование справки</div>
                        <div>{{help.title}}</div>
                        <div>{{help.content}}</div>
                        <div>{{help.section}}</div>
                        </div>
                        <div class="section right-align">
                        <a class="btn">Отмена</a>
                        <a class="btn">Сохранить</a>
</div>
</div>
</div>
                        `,
                        clickOutsideToClose: true,
                        controller: function ($scope) {
                            $scope.help = help;
                        }
                    })
                }
            }
        }
    })
    .directive('svHelp', function (Restangular) {
        return {
            template: `
            <div class="section">
                <div class="row">
                    <div class="col s12">
                    <help-list section="Вопросы" arr="help"></help-list>
                    <help-list section="Ответы" arr="help"></help-list>
                    <help-list section="Диалоги" arr="help"></help-list>
                    </div>
                    </div>
                    </div>
            `,
            link: function (scope) {
                Restangular.all('help').getList().then(function (data) {
                    scope.help = data;
                });
            }
        }
    })
    .directive('admNewsCreate', function (Restangular, SessionManager, $mdDialog, $rootScope) {
        return {
            template: `
            <div class="section">
                    <div class="row">
                    <div class="col s12">
                    <h5>Создание новости</h5>
                    <form name="FormNewCreate">
                    <div class="input-field">
                    <input class="validate" id="title" ng-model="title" type="text" required>
                    <label for="title">Заголовок новости</label>
</div>
<div class="input-field">
<textarea class="materialize-textarea validate" id="body" ng-model="body" required></textarea>
<label for="body">Содержимое новости</label>
</div>
<div class="right-align">
<a class="btn" ng-click="publish()" type="submit" ng-disabled="FormNewCreate.$invalid">Опубликовать</a>
</div>
</form>
<div class="section">
<div ng-repeat="item in news" class=" blue-grey lighten-5"  style="margin: 10px 0; padding: 10px">
<h6 style="font-size: larger; font-weight: 500">{{item.title}}
</h6>
<span>Дата создания: {{item.created | amUtc | amLocal | amDateFormat: 'LLL'}}</span>
<a ng-click="deleteNew(item)" class="you_may_click_here"><i class="material-icons fix_icons_align">delete</i></a>
<a ng-click="editNew(item)" class="you_may_click_here"><i class="material-icons fix_icons_align">edit</i></a>
<blockquote>{{item.body}}</blockquote>
</div>
</div>
</div>
                    </div>
                    </div>
            `,
            link: function (scope) {
                scope.deleteNew = function (item) {
                    $mdDialog.show(
                        $mdDialog.confirm()
                            .title('Удаление новости')
                            .textContent('Вы действительно хотите удалить эту новость?')
                            .ok('ОК')
                            .cancel('Отмена')
                    ).then(function () {
                        Restangular.one('new', item.id).remove().then(function (results) {
                            Materialize.toast('Новость удалена!', 2000);
                            $rootScope.$emit('new_deleted', undefined);
                        });
                    },function () {
                        // canceled
                    });

                };
                scope.editNew = function (item) {
                    $mdDialog.show({
                        template: `
                        <div class="row" style="min-width: 30vw">
                        <div class="col s12">
                        <div class="form-title section center-align">Редактирование новости</div>
                        <label for="title">Заголовок новости</label>
                        <input type="text" id="title" ng-model="title" ng-value="new.title">
                        <label for="body">Содержимое новости</label>
                        <input type="text" ng-model="body" ng-value="new.body" id="body">
                        <div class="right-align">
                            <a class="btn" ng-click="cancel()">Отмена</a>
                            <a class="btn" ng-click="save()">Сохранить</a>
                        </div>
                        </div>
                        </div>
                        `,
                        controller: function ($scope) {
                            $scope.new = item;
                            $scope.cancel = function () {
                                $mdDialog.hide();
                            };
                            $scope.save = function () {
                                Restangular.all('new/update').post({
                                    title: $scope.title,
                                    body: $scope.body,
                                    id: item.id
                                }).then(function (results) {
                                    Materialize.toast('Новость обновлена', 2000);
                                    $mdDialog.hide();
                                    $rootScope.$emit('new_updated', undefined);
                                })
                            }
                        },
                        clickOutsideToClose: true
                    })
                };
                function load() {
                    Restangular.all('news').getList().then(function (news) {
                        scope.news = news;
                    });
                }
                load();

                $rootScope.$on('new_updated', function (event, data) {
                    load();
                });

                $rootScope.$on('new_deleted', function (event, data) {
                    load();
                });
                let author = SessionManager.person.id;
                scope.publish = function () {
                    Restangular.all('new').post({
                        title: scope.title,
                        body: scope.body,
                        author: author,
                        created: new Date()
                    }).then(function (results) {
                        Materialize.toast('Новость создана');
                        [scope.title, scope.body] = '';
                    })
                }
            }
        }
    })
    .directive('svSettings', function () {
        return {
            template: `
            <div class="view-cntr">
            <div class="valign-wrapper">
                <div class="col s12" style="text-transform: uppercase; font-weight: bolder; padding: 20px 0">
                    Настройки веб-сервиса
                </div>
          </div>
          <div class="row"><div class="col s12">
</div></div>
</div>
            `,
            link: function (scope) {
            }
        }
    })
    .directive('svLibrary', function (LibraryService, $mdDialog) {
        return {
            template:`
            <div class="adm_view_head">
            <div class="valign-wrapper">
                <div class="col s12" style="text-transform: uppercase; font-weight: bolder; padding: 20px 0">
                    Управление библиотекой
                </div>
            </div>
                            <a class="btn teal" ng-click="uploadBook()">Добавить книгу</a>
                            <a class="btn teal" ng-click="createCategory()">Добавить категорию</a>
            <div class="row" style="padding-top: 10px">
            <div class="col s12">
            </div>
            </div>
</div>
            <div class="view-cntr">
              <div class="row">
            <div class="col s12">
                  <table class="highlight">
        <thead>
          <tr>
              <th>#</th>
              <th>Наименование</th>
              <th>Категория</th>
              <th>Ссылка</th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          <tr ng-repeat="b in books">
            <td>{{ $index + 1 }}</td>
            <td>{{b.title}}</td>
            <td>
            
            {{b.category}}
            
            </td>
            <td>{{b.path}}</td>
            <td><a ng-click="editBook(b)" class="you_may_click_here"><i class="material-icons fix_icons_align">library_books</i> </a></td>
          </tr>
        </tbody>
      </table>
</div>
</div>
          </div>
            `,
            link: function (scope) {
                LibraryService.getBooks().then(function (books) {
                    scope.books = books;
                });
                scope.createCategory = function () {
                  //TODO cat
                };
                scope.editBook = function (book) {
                    $mdDialog.show({
                        template: `
                    <div class="row" style="max-width: 40vw">
                    <div class="col s12">
                    <div class="section center-align form-title">Редактирование книги</div></div>
                    <form class="col s12">
                    
                    <label for="title">Название</label>                  
                    <input ng-value="book.title" type="text" class="validate" id="title">
                    
                    <label for="path">Путь</label>
                    <input ng-value="book.path" type="text" class="validate" id="path">
                    
                    <label for="cat">Категория</label>
                    <input ng-value="book.category" type="text" class="validate" id="cat"> 

                    <label for="auth">Автор</label>
                    <input ng-value="book.author" type="text" class="validate" id="auth"> 
                    
                    <div class="right-align">
                    <a class="btn">Отмена</a>
                    <a class="btn">Сохранить</a>
</div>
</form>
</div>
                        `,
                        controller: function ($scope) {
                            $scope.book = book;
                        },
                        clickOutsideToClose: true
                    })
                };
                scope.uploadBook = function () {
                    $mdDialog.show({
                        template: `
<div class="row" style="min-width: 30vw">
<div class="col s12">
<div class="section center-align form-title">
Добавить новую книгу
</div>
  <form action="#">
    <div class="input-field">
    <input type="text" id="title">
    <label for="title">Название книги</label>
</div>
<div class="input-field">
    <input type="text" id="cat">
    <label for="cat">Категория</label>
</div>
<div class="input-field">
    <input type="text" id="auth">
    <label for="auth">Автор (если есть)</label>
</div>
    <div></div>
    <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>
    <div class="section right-align">
    <a class="btn" ng-click="cancel()">Отмена</a>
    <a class="btn" ng-click="upload()">ОК</a>
</div>
  </form>
</div>
</div>
`,
                        controller: function ($scope) {
                            $scope.cancel = function () {
                                $mdDialog.hide();
                            };
                            $scope.upload = function () {
                                //TODO upload
                                alert('TODO!')
                            }
                        },
                        clickOutsideToClose: true
                    })
                }
            }
        }
    })
    .directive('svFeedback', function (FeedbackService, $mdDialog) {
        return {
            template: `
<page-struct-template>
<title-here>
Обратная связь
</title-here>
<content-here>
<table class="highlight">
        <thead>
          <tr>
              <th>#</th>
              <th>Содержимое отзыва</th>
              <th>Ник автора</th>
              <th>Дата создания</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="f in feedback">
            <td>{{$index + 1}}</td>
            <td style="min-width: 20vw">{{f.body}}</td>
            <td>{{f.name}}</td>
            <td>{{f.created | amUtc | amLocal | amDateFormat: 'LLL'}}</td>
            <td><a class="you_may_click_here" ng-click="delete_feedback(f)"><i class="material-icons fix_icons_align small">delete_forever</i></a></td>
          </tr>
        </tbody>
      </table>
</content-here>
</page-struct-template>
            `,
            link: function (scope) {
                function load() {
                    return FeedbackService.getAll().then(function (feedback) {
                        scope.feedback = feedback;
                    });
                }
                load();
                scope.delete_feedback = function (f) {
                    $mdDialog.show(
                        $mdDialog.confirm()
                            .title('Удаление отзыва')
                            .textContent('Вы действительно хотите удалить этот отзыв?')
                            .ok('ОК')
                            .cancel('Отмена')
                    ).then(function () {
                        FeedbackService.deleteFeedback(f.id).then(function (results) {
                            Materialize.toast('Отзыв успешно удален!', 2000);
                            let index = scope.feedback.indexOf(f);
                            scope.feedback.splice(index, 1);
                        })
                    }, function () {
                        // cancel
                    })
                }
            }
        }
    })
    .directive('svUsers', function (AdminService, $mdDialog, SessionManager) {
        return {
            template:`
            <div class="adm_view_head">
            <div class="row" style="margin-top: 10px; margin-bottom: 0">
                <div class="col s12">
                <div style="text-transform: uppercase; font-weight: bolder">УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ</div>
                    <div class="col s6">
                        <div>
                        <div class="col s12">
                        
                        <form >
                         <form>
        <div class="input-field">
          <input id="search" type="search" required>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
        </div>
      </form>
                        </form>
                        </div>
</div>
                    </div>
                    <div class="col s6">
</div>
                </div>
            </div>
</div>           
            <div class="view-cntr">
            
            <div class="valign-wrapper">
                <div class="col s12" style="text-transform: uppercase; font-weight: bolder; padding: 20px 0">
                    Обычные пользователи
                </div>
            </div>
            
    <table class="highlight">
        <thead>
        <tr>
            <th>#</th><th>ID</th><th>Имя</th><th>Фамилия</th><th>Вопросов</th><th>Ответов</th><th>Активен</th><th>Резюме</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="p in people | filter: { usergroup: 'user' }">
            <td>{{$index + 1}}.</td>
            <td ng-bind="p.id"></td>
            <td ng-bind="p.name"></td>
            <td ng-bind="p.surname"></td>
            <td ng-bind="p.questions.length"></td>
            <td ng-bind="p.answers.length"></td>
            <td>
                <input class="filled-in" id="active_{{$index}}" type="checkbox" ng-checked="p.active" ng-model="active"/>
                <label for="active_{{$index}}"></label>
            </td>
            <td class="person_data_edit"><a ng-click="edit_user(p)"><i class="material-icons">assignment_ind</i></a></td>
        </tr>
        </tbody>
    </table>
    <div class="valign-wrapper">
                <div class="col s12" style="text-transform: uppercase; font-weight: bolder; padding: 20px 0">
                    Администраторы
                </div>
                
            </div>
    <table class="highlight">
        <thead>
        <tr>
            <th>#</th><th>ID</th><th>Имя</th><th>Фамилия</th><th>Вопросов</th><th>Ответов</th><th>Активен</th><th>Резюме</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="p in people | filter: { usergroup: 'admin' }">
            <td>{{$index + 1}}.</td>
            <td ng-bind="p.id"></td>
            <td ng-bind="p.name"></td>
            <td ng-bind="p.surname"></td>
            <td ng-bind="p.questions.length"></td>
            <td ng-bind="p.answers.length"></td>
<td>
                <input class="filled-in" id="active_{{$index}}" type="checkbox" ng-checked="p.active" ng-model="active" />
                <label for="active_{{$index}}"></label>
            </td>
            <td class="person_data_edit"><a ng-click="edit_user(p)"><i class="material-icons">assignment_ind</i></a></td>
        </tr>
        </tbody>
    </table>
</div>
`,
            link: function (scope) {
                scope.userId = SessionManager.person.id;
                scope.create_new_user = function () {
                    alert('!');
                };
                AdminService.getPeopleInfo().then(function (people) {
                    scope.people = people;
                });
                scope.edit_user = function (user) {
                    $mdDialog.show({
                        controller: function ($scope) {
                            $scope.user = user;
                            $scope.user.birthday = new Date($scope.user.birthday);
                            $scope.option_two = user.usergroup === 'user' ? 'admin' : 'user';
                            $(document).ready(function() {
                                $('select').material_select();
                            });

                        },
                        template: `
<div style="padding: 0px 10px; max-width: 40vw">
    <form name="FormEdit">
        <div class="section center-align form-title col s12">
            <span>Редактирование данных пользователя</span>
        </div>
        <div class="row">     
        <div class="col s6">
        <fieldset>
        <legend>Персональные данные</legend>
            <label for="name">Имя</label>
            <input id="name" ng-value="user.name" required class="validate" type="text"/>
            <label for="surname">Фамилия</label>
            <input id="surname" ng-value="user.surname" required class="validate" type="text"/>
            <label for="email">Почта</label>
            <input id="email" ng-value="user.email" type="email" required class="validate"/>
            <label for="telephone">Телефон</label>
            <input id="telephone" ng-value="user.telephone" required class="validate" type="text"/>
            <label for="date">Дата рождения</label>
            <input type="date" class="datepicker validate" ng-model="user.birthday" required>
            <label for="login">Логин</label>
            <input id="login" ng-value="user.login" required class="validate" type="text"/>
            <div class="col s8">
            <label for="pwd">Пароль</label>
                <input id="pwd" ng-value="user.password" ng-model="pwd" required class="validate" type="password"/>
</div>
            <div style="padding-top: 30px" class="col s4">
            <a class="you_may_click_here" show-pwd>Показать пароль</a>
</div>
                    </fieldset>
        </div>
        <div class="col s6">
        <fieldset>
        <legend>Адрес</legend>
            <label for="country">Имя</label>
            <input id="country" ng-value="user.country" required class="validate" type="text"/>
            <label for="area">Имя</label>
            <input id="area" ng-value="user.area" required class="validate" type="text"/>
            <label for="city">Имя</label>
          <input id="city" ng-model="user.city" required class="validate" type="text"/>
          </fieldset>
          <fieldset>
          <legend>Права</legend>
          <div class="input-field">
                <select ng-model="user.usergroup">
                    <option ng-value="user.usergroup">{{user.usergroup | group_filter}}</option>
                    <option ng-value="option_two">{{option_two | group_filter}}</option>
                </select>
                </div>
                </fieldset>
        </div>
        <div class="col s12 right-align">
        <a class="waves-effect waves-light btn">Отмена</a>
        <input class="waves-effect waves-light btn" ng-disabled="FormEdit.$invalid"
                           value="Сохранить" type="submit"/>
</div>
        </div>
    </form>
</div>
`,
                        parent: angular.element(document.body),
                        clickOutsideToClose:true
                    });
                }
            }
        }
    })
    .directive('showPwd', function () {
        return {
            link: function (scope, elem) {
                let shown = false
                elem.on('click', function () {
                    if (!shown) {
                        angular.element(document.getElementById('pwd')).attr('type', 'text');
                        elem.html('Скрыть пароль');
                        shown = true;
                    } else {
                        angular.element(document.getElementById('pwd')).attr('type', 'password');
                        elem.html('Показать пароль');
                        shown = false;
                    }
                })
            }
        }
    })
    .directive('svQuestions', function (QuestionService) {
        return {
            template: `

<page-struct-template>
<title-here>
Управление вопросами
</title-here>
<content-here>
<table class="highlight">
    <thead>
    <tr>
        <th>#</th>
        <th>ID</th>
        <th>Заголовок вопроса</th>
        <th>Автор</th>        
        <th>Цена, руб.</th>        
        <th>Ответов</th>        
        <th>Закрыт</th>
        <th>Свойства</th>
    </tr>
    </thead>
    <tbody>
    <tr ng-repeat="q in questions">
        <td>{{$index + 1}}.</td>
        <td>{{q.id}}.</td>
        <td class="you_may_click_here" ng-bind="q.title" ui-sref="question({id: q.id})"></td>
        <td class="you_may_click_here" ui-sref="person({id: q.id})">{{q.person.name}} {{q.person.surname}}</td>
        <td>{{q.price}}</td>
        <td>{{q.answers.length}}</td>
        <td>
           <input type="checkbox" id="cs_{{$index}}" ng-checked="q.closed" class="filled-in" close-question="{{q.id}}"/>
           <label for="cs_{{$index}}"></label>
        </td>
        <td><a class="you_may_click_here"><i class="material-icons">description</i></a></td>
    </tr>
    </tbody>
</table>
    <div class="divider"></div>
    <div class="row right-align" style="padding: 10px 15px">
    </div>
</content-here>
</page-struct-template>
`,
            link: function (scope) {
                QuestionService.getAllQuestions().then(function (questions) {
                    scope.questions = questions;
                });
                scope.delete_this = function (question) {
                    alert(question);
                }
            }
        }
    })
    .directive('closeQuestion', function (Restangular) {
        return {
            link: function (scope, element, attrs) {
                let questionId = attrs.closeQuestion;
                element.on('click', function () {
                    if (element.attr('checked')) {
                        // open question
                        Restangular.all('question/open').post({
                            id: questionId
                        }).then(function (results) {
                            Materialize.toast('Вопрос открыт для просмотра!', 2000);
                        });
                        element.attr('checked', false);
                    } else {
                        //close question
                        Restangular.all('question/close').post({
                            id: questionId
                        }).then(function (results) {
                           Materialize.toast('Вопрос закрыт!', 2000);
                        });
                        element.attr('checked', true);
                    }
                })
            }
        }
    })
    .service('AdminService', function (Restangular) {
        const self = this;
        self.getPeopleInfo = function () {
            return Restangular.all('admin/people').getList();
        };
        self.updatePerson = function () {
        };
        self.blockPerson = function () {
        }
    })