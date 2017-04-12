(function () {
    angular.module('legal').service('SessionManager', function ($cookies, $http) {
        const self = this;
        self.auth = function(login, password) {
            return $http.post(url + 'auth', 'login=' + login + '&pwd=' + password, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).then(function (response) {
                if(_.isEmpty(response.data)){
                    alert('Неправильный логин или пароль!!!');
                    return;
                }
                // $cookies.putObject('user-session', response.data);
                self.userInfo = response.data;

            }, function (error) {
                console.log(error);
            });
        };
        self.logout = function () {
            delete self.userInfo;
        };
    })
})();