angular.module('legal').service('QueryService', function (Restangular) {
   const self = this;
   self.loadQuestions = function () {
       return Restangular.oneUrl('test', 'http://localhost:3009/test/all').get();
   };
   self.getQuestion = function (id) {
       return Restangular.oneUrl('one','http://localhost:3009/test/question/' + id).get();
   };
   self.answer = function (id) {
       return Restangular.oneUrl('two','http://localhost:3009/test/question/' + id).post(undefined,
           {id : id});
   };
    self.makeQuestion = function (title, body) {
        return Restangular.oneUrl('three','http://localhost:3009/test/create').post(undefined,
            {
                title: title,
                body: body
            })
    };
    self.selectAnswersById = function (id) {
        return Restangular.oneUrl('test', 'http://localhost:3009/test/'+ id +'/answers').get();
    };
});
