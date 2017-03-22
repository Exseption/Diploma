(function(){
    'use strict';
    angular.module('legal').service('QueryService', function (Restangular) {
        const self = this;
        const url = 'http://localhost:3009/api/v1/';
// ============================================================================================================
        // получаем вопросы
        self.getQuestions = function () { //получаем все вопросы
            return Restangular.oneUrl('one', url + 'questions').get();
        };

        self.getQuestion = function (id) { //получаем конкретный вопрос
            return Restangular.oneUrl('two', url + 'question/' + id).get();
        };

        self.createQuestion = function () { //доделать
            return Restangular.oneUrl('four',url + 'create').post(undefined,
                {
                })
        };
// ============================================================================================================

        // получаем пользователей
        self.getUsers = function () { //получаем пользователей
            return Restangular.oneUrl('six', url + 'users').get();
        };

// ============================================================================================================
        // получаем ответы на вопрос по айдишнику
        self.selectAnswersById = function (id) { //получаем ответы по айди вопроса
            return Restangular.oneUrl('five', url +  id +'/answers').get();
        };

// ============================================================================================================
        // получаем ресурсы
        self.getResources = function () { //получаем вопросы
            return Restangular.oneUrl('seven', url + 'resources').get();
        };

        self.getMessages = function () {
          return Restangular.oneUrl('eight', url + 'messages').get();
        };


    });
})();