angular.module('legal').controller('main-header.ctrl', function ($scope, $mdDialog) {
   // var self = this;

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
    };
});