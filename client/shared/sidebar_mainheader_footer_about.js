angular.module('ws')
    .directive('sidebar',function (SessionManager) { // sidebar
        return{
            controller: function ($scope, PeopleService) {
                PeopleService.getRatings().then(function (ratings) {
                    $scope.ratings = ratings;
                });
            }
            ,
            compile: function (elem) {
                return {
                    pre: function (scope, elem) {
                        if(!angular.isDefined(SessionManager.person)){
                            angular.element(document.querySelector('#admin')).css('display','none');
                            angular.element(document.querySelector('#user')).css('display','none');
                        } else {
                            var role = SessionManager.person.usergroup;
                            if(role === 'user'){
                                angular.element(document.querySelector('#admin')).css('display','none');
                            } else if(role === 'admin'){
                                angular.element(document.querySelector('#user')).css('display','none');
                            }
                        }
                    },
                    post: function (scope, elem) {
                    }
                }
            }
            ,
            templateUrl:'shared/sidebar/sidebar.html'
        }
    })



    .directive('mainHeader',function (SessionManager, $rootScope) {
        return {
            templateUrl:'../shared/header/main-header.html',
            controller: function ($scope, $mdDialog) {
                $scope.auth = function() {
                    $mdDialog.show({
                        controller: function ($scope, SessionManager, $mdDialog) {
                            $scope.cancel = function () {
                                $mdDialog.hide();
                            };
                            $scope.auth = function (login, password, cb) {
                                SessionManager.auth(login, password, cb);
                            }
                        },
                        templateUrl: 'shared/forms/auth/auth-form.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose:true
                    })
                        .then(function() {
                            },
                            function() {
                            });
                }
            },
            compile: function (element, attr) {
                return {
                    pre: function () {
                    },
                    post: function (scope, elem) {
                        $rootScope.$on('authenticated', function (event, data) {
                            console.log(data)
                        })

                    }
                }
            }
        }
    })
    .directive('footerDir', function () {
        return {
            templateUrl: '../shared/footer/footer-dir.html',
            link: function (scope) {
                scope.year = new Date().getUTCFullYear();
            }
        }
    })

    .directive('about', function () {
        return {
            templateUrl: '../shared/about.html',
            link: function (scope) {
                scope.title = 'Добро пожаловать на веб-сервис! Здесь мы можете найти ответы на интересующие вас правовые вопросы!';
                scope.about = 'Данный проект является выпускной квалификационной работой студента Физико-математического факультета БГПУ г. Благовещенск в 2017 году Налимова Игоря.';
                scope.contacts = '<b>email</b>: brain5ur9ery@gmail.com, <b>github</b>: https://github.com/Exseption';
            }
        }
    })