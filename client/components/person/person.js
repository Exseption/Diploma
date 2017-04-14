angular.module('legal').directive('person', function (PeopleService) {
    return {
        controller: function($scope, $stateParams){
            const id = $stateParams.id;
            if(id){
                PeopleService.getPerson(id).then(function (person) {
                    $scope.person = person;
                });
            }
            PeopleService.getPeople().then(function (people) {
                $scope.people = people;
            });
        },
        templateUrl:'components/person/person.html'
    }
});