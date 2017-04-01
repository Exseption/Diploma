angular.module('legal').controller('MessageController', function ($stateParams, $cookies, QueryService) {
   var self = this;
   const id = $stateParams.id;
   self.id = id;
   const dialog = $stateParams.dialog;
   QueryService.getMessages(id, dialog).then(function (results) {
       self.messages = results;
   });
   QueryService.getDialogs(id).then(function (results) {
       self.dialogs = results;
   });

    self.testId = function () {
        alert(id);
    }
});