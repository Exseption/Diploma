(function () {
    angular.module('legal').controller('MainController', function (QuestionService) {
        var self = this;
        QuestionService.getQuestions().then(function (questions) {
            self.questions = questions;
        });
    });
})();