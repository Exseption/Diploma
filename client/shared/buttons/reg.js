angular.module('legal').directive('reg', function ($mdDialog, SessionManager, PeopleService, $rootScope) {
    return {
        template:"<a ng-click='register()'>Регистрация</a>",
        controller: function ($scope) {
            $scope.register = function () {
                $mdDialog.show({
                    controller: function ($scope) {
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
});