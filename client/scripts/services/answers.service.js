angular.module('legal').service('AnswerService', function (Restangular) {
    const self = this;
    self.createAnswer = function (to_question, body, author) {
        return Restangular.all('create/answer').post({
            to_question: to_question,
            body: body,
            author: author
        });
    }
});