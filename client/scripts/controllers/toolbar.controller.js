angular.module('legal').controller('ToolbarController', function ($mdDialog, $mdSidenav, SessionManager) {
   var self = this;
    self.toggleMenu = function() {
        $mdSidenav('left').toggle();
    };

    self.auth = function() {
        $mdDialog.show({
            controller: 'CabinetController',
            controllerAs: 'cc',
            templateUrl: '../../templates/auth-form-part.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        })
            .then(function() {

                },
                function() {

                });
    };

    self.register = function () {
        $mdDialog.show({
            controller: 'CabinetController',
            controllerAs: 'cc',
            templateUrl: '../../templates/create-user.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        })
            .then(function() {

                },
                function() {

                });
    };




    self.logout = function () {
        $cookies.remove('auth-user');
    }

});