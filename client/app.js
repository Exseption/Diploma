(function () {
    'use strict';
    angular.module('legal', [
        'ngMaterial',
        'restangular',
        'ui.router',
        'angularMoment',
        'ngCookies',
        'md.data.table'
    ]);
})();

angular.module('legal')
    .constant('_', window._);

angular.module('legal')
    .config(function(RestangularProvider){
        RestangularProvider
            .setBaseUrl('http://localhost:3009/');
    });

angular
    .module('legal')
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('orange')
            .warnPalette('red');
    });



angular.module('legal')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index',{
                controller: 'MainController',
                controllerAs: 'mc',
                url:'/index',
                templateUrl:'../templates/index.html'
            })


    });

angular.module('legal')
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
    });

angular.module('legal')
    .run(function(amMoment) {
        amMoment.changeLocale('ru');
    });

angular.module('legal')
    .filter('currencyRub', function ($filter) {
        return function (item) {
            return $filter('currency')(item || 0, '', 2) + ' р.';
        };
    });
