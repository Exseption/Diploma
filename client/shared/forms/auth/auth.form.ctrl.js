angular.module('legal').controller('auth.form.ctrl', function ($scope, SessionManager, $mdDialog) {
    $scope.cancel = function () {
        $mdDialog.hide();
    };
    $scope.auth = function (login, password) {
        SessionManager.auth(login, password);
    }
});