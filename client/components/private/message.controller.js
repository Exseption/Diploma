angular.module('legal').controller('MessageController', function ($stateParams) {
   var self = this;
   const id = $stateParams.id;
   self.id = id;
   const dialog = $stateParams.dialog;

    self.testId = function () {
        alert(id);
    }
});