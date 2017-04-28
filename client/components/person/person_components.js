angular.module('ws')
    .directive('peopleList', function (PeopleService) {
        return {
            templateUrl:'../../components/person/people-list.html',
            link: function (scope) {
                PeopleService.getPeople().then(function (people) {
                    scope.people = people;
                })
            }
        }
    })
    .directive('person', function (PeopleService) {
        return {
            controller: function($scope, $stateParams){
                const id = $stateParams.id;
                if(id){
                    PeopleService.getPerson(id).then(function (person) {
                        $scope.person = person;
                        $scope.show_telephone = person.settings[0].show_telephone;
                        $scope.show_email = person.settings[0].show_email;

                    });
                }
                PeopleService.getPeople().then(function (people) {
                    $scope.people = people;
                });
            },
            templateUrl:'components/person/person.html'
        }
    })