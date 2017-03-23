(function () {
    angular.module('legal').service('SessionManager', function ($cookies, $http, $state) {
        const url ='http://localhost:3009/api/v1/';
        const self = this;
        self.userInfo = undefined;

        if($cookies.getObject('auth-user')){
            self.userInfo = $cookies.getObject('auth-user')
        }

        self.auth = function (login, password) {
            $http.post(url + 'auth', 'login=' + login + '&pwd=' + password, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).then(function (response) {
                if(_.isEmpty(response.data)){
                    alert('Неправильный логин или пароль!!!');
                    return;
                }
                $cookies.putObject('auth-user', response.data);
                self.userInfo = response.data;
                $state.go('cabinet')
            }, function (error) {
                console.log(error);
            });
        };
        self.logout = function () {
            $cookies.remove('auth-user');
            self.userInfo = undefined;
        };

    })
})();