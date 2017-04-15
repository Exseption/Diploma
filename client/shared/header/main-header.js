angular.module('legal').directive('mainHeader',function (SessionManager, $rootScope) {
    return {
        templateUrl:'shared/header/main-header.html',
        controller: function ($scope, $mdDialog) {
            $scope.auth = function() {
                $mdDialog.show({
                    controller: 'auth.form.ctrl',
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
                    // if(SessionManager.person){
                    //     // манипулируем структурой директивы на этапе конпиляции
                    //     angular.element(document.querySelector('.simple-button-primary')).remove();
                    // }
                },
                post: function (scope, elem) {
                    $rootScope.$on('authenticated', function (event, data) {
                        console.log(data)
                    })
                    //     angular.element(document.querySelector('.simple-button-primary')).remove();
                    //     angular.element(document.querySelector('.simple-button')).remove();
                    //     angular.element(document.querySelector('.header')).append(
                    //         "<button class='simple-button-primary md-button md-ink-ripple' " +
                    //         "type='button' ng-transclude='' ng-click='auth()'>Кабинет</button>"
                    //     );
                    //     angular.element(document.querySelector('.header')).append(
                    //         "<button class='simple-button-primary md-button md-ink-ripple' " +
                    //         "type='button' ng-transclude='' ng-click='auth()'>Выход</button>"
                    //     );
                    // });
                }
            }
        }
    }
});