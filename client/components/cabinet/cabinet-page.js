angular.module('legal').directive('cabinetPage', function (PeopleService) {
    return {
        templateUrl:'../../components/cabinet/cab.html',
        controller: function ($scope) {
            PeopleService.getPeople().then(function (people) {
                $scope.people = people;
            })

        },
        link: function (scope, elem, attrs) {

        }
    }
});