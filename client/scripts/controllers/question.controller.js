angular.module('legal').controller('QuestionController', function ($stateParams, QueryService) {
   const self = this;
   const id = $stateParams.id;
   QueryService.getQuestion(id).then(function (response) {
       self.question = response;
   });
   self.answer = function (id) {
       QueryService.answer(id);
   };
   self.answers = function (id) {
        QueryService.selectAnswersById(id);
   }
});
