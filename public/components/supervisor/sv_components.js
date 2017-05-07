angular.module('ws')
    .directive('svUsers', function (AdminService, $mdDialog) {
        return {
            template:`
            <div class="view-cntr">
            <div class="valign-wrapper">
                <div class="col s6" style="text-transform: uppercase; font-weight: bolder; padding: 20px 0">
                    Обычные пользователи
                </div>
                <div class="col s6 right-align">
                    <a class="btn-floating" ng-click="create_new_user()"><i class="material-icons">person_add</i> </a>
                </div>
            </div>
            
    <table class="highlight">
        <thead>
        <tr>
            <th>#</th><th>Имя</th><th>Фамилия</th><th>Вопросов</th><th>Ответов</th><th>Активен</th><th>Резюме</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="p in people | filter: { usergroup: 'user' }">
            <td>{{$index + 1}}.</td>
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
                <div class="col s6" style="text-transform: uppercase; font-weight: bolder; padding: 20px 0">
                    Администраторы
                </div>
                <div class="col s6 right-align">
                    <a class="btn-floating" ng-click="create_new_user()"><i class="material-icons">person_add</i> </a>
                </div>
            </div>
    <table class="highlight">
        <thead>
        <tr>
            <th>#</th><th>Имя</th><th>Фамилия</th><th>Вопросов</th><th>Ответов</th><th>Активен</th><th>Резюме</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="p in people | filter: { usergroup: 'admin' }">
            <td>{{$index + 1}}.</td>
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
          <!--<label for="group">Группа</label>-->
                <!--<input type="text" class="validate" id="group" ng-value="user.usergroup">-->
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
            templateUrl:'components/supervisor/questions/questions.html',
            link: function (scope) {
                QuestionService.getQuestions().then(function (questions) {
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