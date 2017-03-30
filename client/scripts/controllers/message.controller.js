angular.module('legal').controller('MessageController', function ($stateParams, $cookies, QueryService) {
   var self = this;
   const id = $stateParams.id;
   self.id = id;
   QueryService.getMessages(id).then(function (results) {
       self.messages = results;
   });
});