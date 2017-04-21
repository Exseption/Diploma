(function(){
    'use strict';
    angular.module('legal').service('PeopleService', function (Restangular) {
        const self = this;
        self.deletePerson = function (id) {
            return Restangular.one('delete/person',id).remove();
        };

        self.getRatings = function () {
            return Restangular.one('ratings','people').getList();
        };

        self.getPerson = function (id) {
          return Restangular.one('person', id).get();
        };
        self.getPeople = function () { //получаем все вопросы
            return Restangular.all('people').getList();
        };
        self.registerPerson = function (login, password, name, surname, email, birthday, country, area, city, telephone) {
            return Restangular.all('create/person').post({
                login: login,
                password: password,
                name: name,
                surname: surname,
                email: email,
                birthday: birthday,
                country: country,
                area: area,
                city: city,
                telephone: telephone
            })
        }
    });
})();