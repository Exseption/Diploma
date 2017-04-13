angular.module('legal').directive('question', function () {
    return {
        scope: {
          question: '<'
        },
        templateUrl:'../../components/question/question.html',
        controller:'QuestionController'
    }
});