angular.module('legal').directive('exitButton', function (SessionManager, $cookies) {
    return {
        template:"<button class='simple-button-primary md-button md-ink-ripple' " +
        "type='button'  ng-click='exit()'>Выход</button>",
        compile: function (elem, attrs, linker) {
            return {
                pre: function (scope, elem) {
                    if(!angular.isDefined(SessionManager.person)){
                        elem.remove();
                    }
                },
                post: function (scope, elem) {
                    scope.exit = function () {
                        $cookies.remove('person');
                        delete SessionManager.person;
                        console.log(SessionManager.person)
                    }
                }
            }
        }
    }
});