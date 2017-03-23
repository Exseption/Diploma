angular.module('legal').controller('SidenavController', function ($mdSidenav, $mdDialog, $cookies, SessionManager) {
   var self = this;
    self.toggleMenu = function() {
        $mdSidenav('left').toggle();
    };
    self.userInfo = $cookies.getObject('auth-user');
    self.logout = function () {
        $cookies.remove('auth-user');
    }
});