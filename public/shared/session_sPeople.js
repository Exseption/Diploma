/**
 * Created by Brainsurgery on 005 05.05.17.
 */
angular.module('ws')

    .service('SessionManager', function ($cookies, $http, $mdDialog, $rootScope) { // session manager
        const self = this;
        const url ='http://localhost:3009/api/v1/';

        if($cookies.getObject('person')){
            self.person = $cookies.getObject('person');
        }

        self.auth = function(login, password, cookie) {
            return $http.post(url + 'auth', 'login=' + login + '&pwd=' + password, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }}).then(function (response) {
                if(_.isEmpty(response.data)){
                    alert('Неправильный логин или пароль!!!');
                    return;
                }
                console.log(cookie);
                if(cookie){
                    $cookies.putObject('person', response.data[0]);
                }
                self.person = response.data[0];
                $rootScope.$emit('authenticated', response.data[0].name + ' ' + response.data[0].surname + ' successfully authenticated!' );

                $mdDialog.hide();
            }, function (error) {
                console.log(error);
            });
        };
        self.logout = function () {
            delete self.person;
            $cookies.remove('person');
        };
    })

    .service('PeopleService', function (Restangular) {
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
        self.getPeople = function () {
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
    })