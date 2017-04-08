(function(){
    'use strict';
    angular.module('legal').service('PeopleService', function (Restangular) {
        const self = this;
        const url = 'http://localhost:3009/api/v1/';
        self.getQuestions = function () { //получаем все вопросы
            return Restangular.all('people');
        };


    });
})();