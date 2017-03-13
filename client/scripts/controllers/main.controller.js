(function () {
    angular.module('legal').controller('MainController', function (QueryService) {
        var self = this;
        QueryService.loadQuestions().then(function (response) {
            self.questions = response;
        },function (error) {
            alert(error);
        });
        self.makeQuestion = function () {
         QueryService.makeQuestion();
        };
    });
})();
