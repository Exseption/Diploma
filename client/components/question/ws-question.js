angular.module('legal').directive('wsQuestion',function () {
    return {
        bindings:{
            question: '<'
        },
        templateUrl:'templates/directives/ws-question.html'
    }});