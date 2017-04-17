angular.module('legal').service('AnswerService', function (Restangular) {
    const self = this;
    self.createAnswer = function (toquestion, body, author) {
        return Restangular.all('create/answer').post({
            question: toquestion,
            body: body,
            author: author
        });
    }
});