angular.module('legal').controller('QuestionController', function ($stateParams, QuestionService) {
   const self = this;
   const id = $stateParams.id;
    QuestionService.getQuestion(id).then(function (question) {
        self.question = question;
    })
   // QueryService.getQuestion(id).then(function (response) {
   //     self.question = response;
   //     QueryService.selectAnswersById(id).then(function (response) {
   //         self.answers = response;
   //     }, function (error) {
   //         throw error;
   //     });
   // });
   //
   
   // self.answer = function (answer, files) {
   //     QueryService.createAnswer(answer, id).then(function (results) {
   //         QueryService.selectAnswersById(id).then(function (response) {
   //             self.answers = response;
   //         })
   //     });
   // }
});