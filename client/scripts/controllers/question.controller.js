angular.module('legal').controller('QuestionController', function ($stateParams, QueryService) {
   const self = this;
   const id = $stateParams.id;
   QueryService.getQuestion(id).then(function (response) {
       self.question = response;
       QueryService.selectAnswersById(id).then(function (response) {
           self.answers = response;
       });
   });
});