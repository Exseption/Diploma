angular.module('legal').service('QueryService', function (Restangular) {
   const self = this;

   self.getQuestions = function () { //получаем все вопросы
       return Restangular.oneUrl('one', 'http://localhost:3009/api/v1/questions').get();
   };
   self.getQuestion = function (id) { //получаем конкретный вопрос
       return Restangular.oneUrl('two','http://localhost:3009/api/v1/question/' + id).get();
   };
   self.getAnswer = function (id) {
       return Restangular.oneUrl('three','http://localhost:3009/api/v1/question/' + id).post(undefined,
           {id : id});
   };
    self.makeQuestion = function () { //доделать
        return Restangular.oneUrl('four','http://localhost:3009/api/v1/question/create').post(undefined,
            {
            })
    };

    self.getUsers = function () { //получаем
        return Restangular.oneUrl('six', 'http://localhost:3009/api/v1/users').get();
    };

    self.selectAnswersById = function (id) { //получаем ответы по айди вопроса
        return Restangular.oneUrl('five', 'http://localhost:3009/api/v1/'+ id +'/answers').get();
    };

    self.getResources = function () {
        return Restangular.oneUrl('seven', 'http://localhost:3009/api/v1/resources').get();
    }
});
