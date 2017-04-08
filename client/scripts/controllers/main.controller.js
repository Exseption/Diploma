(function () {
    angular.module('legal').controller('MainController', function (QuestionService, $mdSidenav) {
        var self = this;
        QuestionService.getQuestions().then(function (questions) {
            self.questions = questions;
        })
        // QueryService.getQuestions().then(function (response) {
        //     self.questions = response;
        // },function (error) {
        //     alert(error);
        // });
        // self.makeQuestion = function (title, body) {
        //   QueryService.makeQuestion(title, body);
        // };

    });
})();
