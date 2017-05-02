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
                        templateUrl: 'shared/forms/auth/auth-form.html',
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
