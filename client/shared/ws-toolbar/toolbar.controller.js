angular.module('legal').controller('ToolbarController', function ($scope, $mdDialog) {
   // var self = this;

    $scope.auth = function() {
        $mdDialog.show({
            controller: 'CabinetController',
            // controllerAs: 'cc',
            templateUrl: 'shared/forms/auth/auth-form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        })
            .then(function() {

                },
                function() {

                });
    };
    $scope.register = function () {
        $mdDialog.show({
            controller: 'CabinetController',
            controllerAs: 'cc',
            templateUrl: '../../components/person/create-user.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        })
            .then(function() {

                },
                function() {

                });
    };

    // $scope.logout = function () {
    //     $cookies.remove('auth-user');
    // }

});