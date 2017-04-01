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
              // .primaryPalette('grey')
            // .accentPalette('orange')
            // .warnPalette('red');
    });



angular.module('legal')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index',{
                controller: 'MainController',
                controllerAs: 'mc',
                url:'/index',
                templateUrl:'templates/index.html'
            })
            .state('messages', {
                controller:'MessageController',
                controllerAs: 'mc',
                url:'/:id/messages',
                templateUrl: 'templates/messages.html'
            })
            .state('dialogs', {

                            controller: 'MessageController',
                            controllerAs: 'mc',
                            url: '/:id/dialog/:dialog/messages',
                            templateUrl: 'templates/dialog.html'



            })
            .state('user/questions', {
                // controller:'CabinetController',
                // controllerAs: 'cc',
                url:'user/:id/questions',
                templateUrl: 'templates/my-questions.html'

            })
            .state('library',{
                controller: 'LibraryController',
                controllerAs: '',
                url:'/library',
                templateUrl:'templates/library.html'
            })
            .state('question', {
                controller: 'QuestionController',
                controllerAs: 'qc',
                url: '/question/:id',
                templateUrl: 'templates/question.html'
            })
            .state('users', {
                controller: 'UserController',
                controllerAs: 'uc',
                url: '/users',
                templateUrl: 'templates/users.html'
            })
            .state('user', {
                controller: 'UserController',
                controllerAs: 'uc',
                url: '/user/:id',
                templateUrl: 'templates/user.html'
            })
            .state('cabinet', {
                controller: 'CabinetController',
                controllerAs: 'cc',
                url: '/cabinet',
                templateUrl: 'templates/cabinet.html'
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
