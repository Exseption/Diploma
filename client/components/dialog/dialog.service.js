angular.module('legal').service('DialogService', function (Restangular) {
    const self = this;
    self.getDialogs = function (id) {
        return Restangular.one('person', id).get('dialogs');
    }
});