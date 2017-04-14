angular.module('legal').controller('PersonController', function ($scope, $stateParams, PeopleService) {

   const id = $stateParams.id;

   if(id){
       PeopleService.getPerson(id).then(function (person) {
           $scope.person = person;
       });
   }

    PeopleService.getPeople().then(function (people) {
        $scope.people = people;
    });
});