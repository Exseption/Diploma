(function(){
    'use strict';
    angular.module('legal').service('QuestionService', function (Restangular) {
        const self = this;
        self.getQuestions = function () { //получаем все вопросы
            return Restangular.all('questions').getList();
        };
        self.getQuestion = function (id) {
            return Restangular.one('question',id).get();
        }


    });
})();