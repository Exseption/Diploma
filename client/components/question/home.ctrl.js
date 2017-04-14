(function () {
    angular.module('legal').controller('home.ctrl', function ($scope, QuestionService) {
        QuestionService.getQuestions().then(function (questions) {
            $scope.questions = questions;
        });
    });
})();