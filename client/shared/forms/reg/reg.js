angular.module('legal').directive('reg', function ($mdDialog, SessionManager, PeopleService, $rootScope) {
    return {
        template:"<button class='simple-button-primary md-button md-ink-ripple' " +
        "type='button'  ng-click='register()'>Регистрация</button>",
        controller: function ($scope) {
            $scope.register = function () {
                $mdDialog.show({
                    controller: function ($scope) {
                        $scope.cancel = function () {
                            $mdDialog.hide();
                        };
                        $scope.register = function (login, password, name, surname,
                                                    birthday, country, area, city, telephone) {
                            PeopleService.registerPerson(login, password, name, surname,
                                birthday, country, area, city, telephone)
                                .then(function (success) {
                                    $mdDialog.hide();
                            }, function (error) {
                                alert('Ошибка!!!')
                            })
                        }
                    },
                    templateUrl: '../../../shared/forms/reg/reg.html',
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