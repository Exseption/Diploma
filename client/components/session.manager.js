(function () {
    angular.module('legal').service('SessionManager', function ($cookies, $http, $mdDialog, $rootScope) {
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

                    $rootScope.$emit('authenticated', response.data[0].name + ' ' + response.data[0].surname + ' successfully authenticated!' );
                    self.person = response.data[0];
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
})();