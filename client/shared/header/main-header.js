angular.module('legal').directive('mainHeader',function (SessionManager, $rootScope) {
    return {
        templateUrl:'shared/header/main-header.html',
        controller: 'main-header.ctrl',
        compile: function (element, attr) {
            return {
                pre: function () {
                    // if(SessionManager.person){
                    //     // манипулируем структурой директивы на этапе конпиляции
                    //     angular.element(document.querySelector('.simple-button-primary')).remove();
                    // }
                },
                post: function (scope, elem) {
                    // $rootScope.$on('authenticated', function (event, data) {
                    //     angular.element(document.querySelector('.simple-button-primary')).remove();
                    //     angular.element(document.querySelector('.simple-button')).remove();
                    //     angular.element(document.querySelector('.header')).append(
                    //         "<button class='simple-button-primary md-button md-ink-ripple' " +
                    //         "type='button' ng-transclude='' ng-click='auth()'>Кабинет</button>"
                    //     );
                    //     angular.element(document.querySelector('.header')).append(
                    //         "<button class='simple-button-primary md-button md-ink-ripple' " +
                    //         "type='button' ng-transclude='' ng-click='auth()'>Выход</button>"
                    //     );
                    // });
                }
            }
        }
    }
});