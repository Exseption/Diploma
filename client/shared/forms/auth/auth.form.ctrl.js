angular.module('legal').controller('auth.form.ctrl', function ($scope, SessionManager, $mdDialog) {
    $scope.cancel = function () {
        $mdDialog.hide();
    };
    $scope.auth = function (login, password, cb) {
        SessionManager.auth(login, password, cb);
    }
});