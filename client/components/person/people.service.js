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
        self.registerPerson = function (login, password, name, surname, birthday, country, area, city, telephone) {
            return Restangular.all('create/person').post({
                login: login,
                password: password,
                name: name,
                surname: surname,
                birthday: birthday,
                country: country,
                area: area,
                city: city,
                telephone: telephone
            })
        }
    });
})();