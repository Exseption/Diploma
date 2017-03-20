angular.module('legal').controller('UserController', function (QueryService, $stateParams) {
   const self = this;
   const id = $stateParams.id;
   QueryService.getUsers().then(function (response) {
       self.users = response;

   });
});