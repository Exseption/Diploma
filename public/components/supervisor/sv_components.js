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
    .directive('pageStructTemplate', function () {
        return {
            transclude: {
                title: 'titleHere',
                content: 'contentHere'
            }, template: `
            <div class="view-cntr">
          <div class="valign-wrapper">
                <div class="col s12" style="text-transform: uppercase; font-weight: bolder; padding: 20px 0">
                    <div ng-transclude="title"></div>
                </div>
            </div>
            <div class="row">
            <div class="col s12">
            <div ng-transclude="content"></div>
            </div>
            </div>
          </div>
            `
        }
    })
    .directive('svPages', function () {
        return {
            template: `
<page-struct-template>
<title-here>Управление разделами и страницами</title-here>
<content-here>
<div class="col s2">
<div class="adm_pages">НОВОСТИ</div>
<div class="adm_pages">СПРАВКА</div>
<div class="adm_pages">О НАС</div>

</div>
<div class="col s10"></div>

</content-here>
</page-struct-template>
            `
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

    .directive('svFeedback', function (FeedbackService) {
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
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="f in feedback">
            <td>{{$index + 1}}</td>
            <td>{{f.body}}</td>
            <td>{{f.name}}</td>
            <td><a class="you_may_click_here" ng-click="delete_feedback(f)"><i class="material-icons fix_icons_align small">delete_forever</i></a></td>
          </tr>
        </tbody>
      </table>
</content-here>
</page-struct-template>
            `,
            link: function (scope) {
                FeedbackService.getAll().then(function (feedback) {
                    scope.feedback = feedback;
                });
                scope.delete_feedback = function (feedback) {
                    //TODO delete fb
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
        <td class="you_may_click_here" ng-bind="q.title" ui-sref="question({id: q.id})"></td>
        <td class="you_may_click_here" ui-sref="person({id: q.id})">{{q.person.name}} {{q.person.surname}}</td>
        <td>{{q.price}}</td>
        <td>{{q.answers.length}}</td>
        <td>
           <input type="checkbox" id="cs_{{$index}}" ng-checked="q.closed" class="filled-in"/>
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