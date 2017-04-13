(function () {
    angular.module('legal').service('SessionManager', function ($cookies, $http, $mdDialog) {
        const self = this;
        const url ='http://localhost:3009/api/v1/';

        self.auth = function(login, password) {
            return $http.post(url + 'auth', 'login=' + login + '&pwd=' + password, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }}).then(function (response) {
                    if(_.isEmpty(response.data)){
                        alert('Неправильный логин или пароль!!!');
                        return;
                    }
                self.person = response.data[0];
                    $mdDialog.hide();
            }, function (error) {
                console.log(error);
            });
        };
        self.logout = function () {
            delete self.person;
        };
    })
})();