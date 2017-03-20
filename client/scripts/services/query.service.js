angular.module('legal').service('QueryService', function (Restangular) {
   const self = this;

   self.loadQuestions = function () { //получаем все вопросы
       return Restangular.oneUrl('one', 'http://localhost:3009/test/all').get();
   };
   self.getQuestion = function (id) { //получаем конкретный вопрос
       return Restangular.oneUrl('two','http://localhost:3009/test/question/' + id).get();
   };
   self.answer = function (id) {
       return Restangular.oneUrl('three','http://localhost:3009/test/question/' + id).post(undefined,
           {id : id});
   };
    self.makeQuestion = function () {
        return Restangular.oneUrl('four','http://localhost:3009/test/question/create').post(undefined,
            {
            })
    };
    self.selectAnswersById = function (id) { //получаем ответы по айди вопроса
        return Restangular.oneUrl('five', 'http://localhost:3009/test/'+ id +'/answers').get();
    };
});
