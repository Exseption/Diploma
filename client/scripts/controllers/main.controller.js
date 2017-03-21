(function () {
    angular.module('legal').controller('MainController', function (QueryService) {
        var self = this;
        QueryService.getQuestions().then(function (response) {
            self.questions = response;
        },function (error) {
            alert(error);
        });
        self.makeQuestion = function (title, body) {
          QueryService.makeQuestion(title, body);
        };
    });
})();
