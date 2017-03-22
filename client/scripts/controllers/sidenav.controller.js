angular.module('legal').controller('SidenavController', function ($mdSidenav) {
   var self = this;
    self.toggleMenu = function() {
        $mdSidenav('left').toggle();
    };
});