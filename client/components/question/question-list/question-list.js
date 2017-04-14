angular.module('legal').directive('questionList', function (QuestionService) {
    return {
        controller: function ($scope) {
            QuestionService.getQuestions().then(function (questions) {
                $scope.questions = questions;
            });
        },
        template:
        '<div ng-repeat="item in questions">' +
                        '<question-list-item item="item"></question-list-item>' +
                        '</div>'
    }
});