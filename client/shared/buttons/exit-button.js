angular.module('legal').directive('exitButton', function (SessionManager, $cookies, $state, $rootScope) {
    return {
        template:"<button class='simple-button-primary md-button md-ink-ripple' " +
        "type='button'  ng-click='exit()'>Выход</button>",
        compile: function (elem, attrs, linker) {
            return {
                pre: function (scope, elem) {
                    if(!angular.isDefined(SessionManager.person)){
                        elem.css('display', 'none');
                    }
                },
                post: function (scope, elem) {
                    $rootScope.$on('authenticated', function (e, data) {
                        //TODO настроить появление
                        // elem.append("<button class='simple-button-primary md-button md-ink-ripple' " +
                        //     "type='button'  ng-click='exit()'>Выход</button>");
                        elem.css('display', 'block');
                    });

                    scope.exit = function () {
                        SessionManager.logout();
                       //TODO window reload
                    }
                }
            }
        }
    }
});