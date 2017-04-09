(function(){
    'use strict';
    angular.module('legal').service('PeopleService', function (Restangular) {
        const self = this;
        self.getPerson = function (id) {
          return Restangular.one('person', id).get();
        };
        self.getPeople = function () { //получаем все вопросы
            return Restangular.all('people').getList();
        };
    });
})();