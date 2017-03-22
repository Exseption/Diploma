(function () {
    angular.module('legal').service('SessionManager', function ($cookies, Restangular) {
        self.auth = function () {
            // постим логин пароль и получаем объект пользователя, сохраняем его в куки
        };
        self.getUser = function () {
            // получаем объект пользователя из куки
            return Restangular.oneUrl('six', url + 'users').get();
        }
    })
})();