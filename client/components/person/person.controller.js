angular.module('legal').controller('PersonController', function ($stateParams, PeopleService) {
   const self = this;
   const id = $stateParams.id;

   if(id){
       PeopleService.getPerson(id).then(function (person) {
           self.person = person;
       });
   }

    PeopleService.getPeople().then(function (people) {
        self.people = people;
    });
});