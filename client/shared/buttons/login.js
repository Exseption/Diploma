angular.module('legal').directive('login', function (SessionManager, $rootScope) {
    return {
        template:'<md-button ng-click="auth()" class="simple-button">Войти</md-icon></md-button>',
        compile: function () {
            return {
                pre: function (scope, elem) {
                    if(!angular.isDefined(SessionManager.person)){
                        elem.css('display', 'block');
                    }
                },
                post: function (scope, elem) {
                    $rootScope.$on('authenticated', function (e, data) {
                        elem.css('display', 'none');
                    })
                    if(angular.isDefined(SessionManager.person)){
                        elem.css('display', 'none');
                    }
                }
            }
        }
    }
});