angular.module('legal').controller('QuestionController', function ($stateParams, QuestionService,RatingService) {
   const self = this;
   const id = $stateParams.id;
    QuestionService.getQuestion(id).then(function (question) {
        self.question = question;
    });

});