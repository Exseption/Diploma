angular.module('legal').directive('person', function () {
    return {
        controller: 'PersonController',
        templateUrl:'templates/components/ws-person.html'
    }
})