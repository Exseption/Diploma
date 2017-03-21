angular.module('legal').controller('CabinetController', function (QueryService) {
   const self = this;
    QueryService.getQuestions().then(function (results) {
        self.questions = results;
    });
    QueryService.getUsers().then(function (results) {
        self.users = results;
    });
});