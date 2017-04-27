angular.module('ws')
    .directive('login', function (SessionManager, $rootScope) {
        return {
            template:'<a ng-click="auth()">Войти</a>',
            compile: function () {
                return {
                    pre: function (scope, elem) {
                        if(!angular.isDefined(SessionManager.person)){
                            elem.css('display', 'block');
                        }
                    },
                    post: function (scope, elem) {
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
            template:"<a ng-click='exit()'>Выход</a>",
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
                            // elem.append("<button class='simple-button-primary md-button md-ink-ripple' " +
                            //     "type='button'  ng-click='exit()'>Выход</button>");
                            elem.css('display', 'block');
                        });

                        scope.exit = function () {
                            SessionManager.logout();
                            //TODO window reload
                        }
                    }
                }
            }
        }
    })
    .directive('ask', function (SessionManager, $rootScope, $mdDialog, QuestionService, $mdToast) {
        return {
            template: '<a ng-click="openQuestionDialog()">Задать вопрос</a>',
            controller: function ($scope) {
                $scope.openQuestionDialog = function(ev) {
                    $mdDialog.show({
                        controller: function ($scope) {
                            $scope.hide = function () {
                                $mdDialog.hide();
                            };
                            $scope.payable = 'free';
                            $scope.createQuestion = function (title, body, author, payable, price ) {
                                const personId = SessionManager.person.id;
                                if(payable === 'free'){
                                    payable = false;
                                } else {
                                    payable = true;
                                }
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
            template:"<a ng-click='register()'>Регистрация</a>",
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
                        templateUrl: 'shared/buttons/reg.html',
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
                        $rootScope.$on('authenticated', function (e, data) {
                            elem.remove();
                        })
                    }
                }
            }

        }
    })
