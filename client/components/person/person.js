angular.module('legal').directive('person', function () {
    return {
        controller: 'PersonController',
        templateUrl:'components/person/person.html'
    }
});