angular.module('legal').controller('QuestionController', function ($scope, $stateParams, QuestionService) {
   const id = $stateParams.id;
    QuestionService.getQuestion(id).then(function (question) {
        $scope.question = question;
    });

});