angular.module('legal').directive('wsQuestion', function () {
    return {
        scope: {
            question: '<'
        },
        controller: function () {

        },
        controllerAs: 'qc',
        templateUrl:'components/question/ws-question.html'
    }});