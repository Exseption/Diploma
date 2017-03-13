(function () {
    angular.module('legal').controller('MainController', function (QueryService) {
        var self = this;
        QueryService.loadQuestions().then(function (response) {
            self.questions = response;
        },function (error) {
            alert(error);
        });
        self.makeQuestion = function (question) {
            //доделать
          Restangular.oneUrl('one','http://localhost:3009/test/question/create').post(undefined,
              {
                  'title-question':question.title,
                  'body-question': question.body
              })
        };
    });
})();
