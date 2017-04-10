(function(){
    'use strict';
    angular.module('legal').service('QuestionService', function (Restangular) {
        const self = this;
        self.getQuestions = function () { //получаем все вопросы
            return Restangular.all('questions').getList();
        };
        self.getQuestion = function (id) {
            return Restangular.one('question',id).get();
        };
        self.createQuestion = function (title, body, author, payable, price) {
            return Restangular.all('create/question').post({
                author: author,
                body: body,
                title: title,
                payable: payable,
                price: price
            })
        }


    });
})();