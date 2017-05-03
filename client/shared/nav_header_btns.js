angular.module('ws')
    .directive('login', function (SessionManager, $rootScope, $mdDialog) {
        return {
            controller: function ($scope) {
                $scope.auth = function () {
                    $mdDialog.show({
                        controller: function ($scope, SessionManager) {
                            $scope.cancel = function () {
                                $mdDialog.hide();
                            };
                            $scope.auth = function (login, password, cb) {
                                SessionManager.auth(login, password, cb);
                            }
                        },
                        template: `<form name="FormAuth">
    <div class="section center-align form-title">
      <span>Авторизация пользователя</span>
    </div>
    <div class="row">
      <div class="col s12">
    <div class="row">
      <div class="input-field">
        <input id="login" ng-model="login" type="text" class="validate" required/>
        <label for="login">Логин:</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field">
        <input id="password" ng-model="password" type="password" class="validate" required/>
        <label for="password">Пароль:</label>
      </div>
    </div>
    <p>
      <input type="checkbox" ng-model="cb" id="chkbx"/>
      <label for="chkbx">Запомнить меня</label>
    </p>
    <a class="waves-effect waves-light btn" ng-click="cancel()">Отмена</a>
    <a class="waves-effect waves-light btn" ng-click="auth(login, password, cb)" ng-disabled="FormAuth.$invalid">Войти</a>
    </div>
    </div>
  </form>`,
                        parent: angular.element(document.body),
                        clickOutsideToClose: true
                    })
                        .then(function () {
                            },
                            function () {
                            });
                }
            },
            compile: function () {
                return {
                    pre: function (scope, elem) {
                        if(!angular.isDefined(SessionManager.person)){
                            elem.css('display', 'block');
                        }
                    },
                    post: function (scope, elem) {
                        elem.on('click', function () {
                            scope.auth();
                        });
                        $rootScope.$on('authenticated', function (e, data) {
                            elem.css('display', 'none');
                        });
                        if(angular.isDefined(SessionManager.person)){
                            elem.css('display', 'none');
                        }
                    }
                }
            }
        }
    })
    .directive('exitButton', function (SessionManager, $cookies, $state, $rootScope) {
        return {
            compile: function (elem, attrs, linker) {
                return {
                    pre: function (scope, elem) {
                        if(!angular.isDefined(SessionManager.person)){
                            elem.css('display', 'none');
                        }
                    },
                    post: function (scope, elem) {
                        $rootScope.$on('authenticated', function (e, data) {
                            //TODO настроить появление
                            elem.css('display', 'block');
                        });
                        scope.exit = function () {
                            SessionManager.logout();
                            //TODO window reload
                        };
                        elem.on('click', function () {
                          scope.exit();
                        });
                    }
                }
            }
        }
    })
    .directive('ask', function (SessionManager, $rootScope, $mdDialog, QuestionService, $mdToast) {
        return {
            controller: function ($scope) {
                $scope.openQuestionDialog = function() {
                    $mdDialog.show({
                        controller: function ($scope) {
                            $scope.hide = function () {
                                $mdDialog.hide();
                            };
                            $scope.payable = 'free';
                            $scope.createQuestion = function (title, body, author, payable, price ) {
                                const personId = SessionManager.person.id;
                                payable = payable !== 'free';
                                QuestionService.createQuestion(title, body, personId, payable, price).then(function (result) {
                                    console.log(result);
                                    $mdDialog.hide();
                                    $mdToast.show(
                                        $mdToast.simple()
                                            .textContent('Вопрос успешно задан!')
                                            .hideDelay(5000)
                                    )
                                })
                            }
                        },
                        templateUrl: '../../components/question/creating/create-question.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose:true
                    })
                };
            },
            compile: function () {
                return {
                    pre: function (scope, elem) {
                        if(!angular.isDefined(SessionManager.person)){
                            elem.css('display', 'none');
                        }
                    },
                    post: function (scope, elem) {
                        elem.on('click', function () {
                            scope.openQuestionDialog();
                        });
                        $rootScope.$on('authenticated', function (e, data) {
                            elem.css('display', 'block')
                        })

                    }
                }
            }
        }
    })
    .directive('reg', function ($mdDialog, SessionManager, PeopleService, $rootScope) {
        return {
            controller: function ($scope) {
                $scope.register = function () {
                    $mdDialog.show({
                        controller: function ($scope) {
                            $('.datepicker').pickadate({
                                selectMonths: true,
                                selectYears: 50
                            });
                            $scope.cancel = function () {
                                $mdDialog.hide();
                            };
                            $scope.register = function (login, password, name, surname, email,
                                                        birthday, country, area, city, telephone) {
                                PeopleService.registerPerson(login, password, name, surname, email,
                                    birthday, country, area, city, telephone)
                                    .then(function (success) {
                                        $mdDialog.hide();
                                    }, function (error) {
                                        alert('Ошибка!!!')
                                    })
                            }
                        },
                        template: `<form ng-cloak name="FormReg">
<div class="section center-align form-title">
      <span>Регистрация нового пользователя</span>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="login" ng-model="login" type="text" required class="validate"/>
            <label for="login">Логин</label>
          </div>

          <div class="input-field col s6">
            <label for="password">Пароль</label>
            <input id="password" ng-model="password" type="password" required class="validate"/>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <label for="name">Имя</label>
            <input id="name" ng-model="name" required class="validate" type="text"/>
          </div>
          <div class="input-field col s6">
            <label for="surname">Фамилия</label>
            <input id="surname" ng-model="surname" required class="validate" type="text"/>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="email">Email</label>
            <input id="email" ng-model="email" type="email" required class="validate"/>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="country">Страна</label>
            <input id="country" ng-model="country" required class="validate" type="text"/>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="area">Область, край и тд</label>
            <input id="area" ng-model="area" required class="validate" type="text"/>
          </div>
        </div>
    <div class="row">
      <div class="input-field col s12">
        <label for="city">Город, поселок и тд.</label>
        <input id="city" ng-model="city" required class="validate" type="text"/>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <label for="telephone">Телефон</label>
        <input id="telephone" ng-model="telephone" required class="validate" type="text"/>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input type="date" class="datepicker" ng-model="birthday" required>
      </div>
    </div>
        <div class="row">
          <a class="waves-effect waves-light btn" ng-click="cancel()">Отмена</a>
          <input class="waves-effect waves-light btn" ng-disabled="FormReg.$invalid"
                 ng-click="register(login, password, name, surname, email, birthday,
             country, area, city, telephone)" value="Зарегистрироваться" type="submit"/>

        </div>
      </div>
    </div>
  </form>`,
                        parent: angular.element(document.body),
                        clickOutsideToClose:true
                    })
                        .then(function() {

                            },
                            function() {

                            });
                };
            },
            compile: function () {
                return {
                    pre: function (scope, elem) {
                        if(angular.isDefined(SessionManager.person)){
                            elem.remove();
                        }
                    },
                    post: function (scope, elem) {
                        elem.on('click', function () {
                            scope.register();
                        });
                        $rootScope.$on('authenticated', function (e, data) {
                            elem.remove();
                        })
                    }
                }
            }

        }
    })
