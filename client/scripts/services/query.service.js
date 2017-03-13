angular.module('legal').service('QueryService', function (Restangular) {
   const self = this;
   self.loadQuestions = function () {
       return Restangular.oneUrl('test', 'http://localhost:3009/test/all').get();
   };
   self.getQuestion = function (id) {
       return Restangular.oneUrl('one','http://localhost:3009/test/question/' + id).get();
   };
   self.answer = function (id) {
       return Restangular.oneUrl('one','http://localhost:3009/test/question/' + id).post(undefined,
           {id : id});
   }
});