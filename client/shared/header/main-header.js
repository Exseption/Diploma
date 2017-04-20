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
                },
                post: function (scope, elem) {
                    $rootScope.$on('authenticated', function (event, data) {
                        console.log(data)
                    })

                }
            }
        }
    }
});