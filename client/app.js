(function () {
    'use strict';
    angular.module('legal', [
        'ngMaterial',
        'restangular',
        'ui.router',
        'angularMoment',
        'ngCookies',
        'md.data.table',
        'ngSanitize'
    ])
        .constant('_', window._)
        .config(function(RestangularProvider){
        RestangularProvider
            .setBaseUrl('http://localhost:3009/api/v1');
    })
        .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
    })
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
                url:'user/:id/questions',
                templateUrl: 'templates/my-questions.html'

            })
            .state('ask',{
                url:'/ask',
                template:'<create-question></create-question>'
            })
            .state('search',{
                url:'/search',
                template:'<div>Поиск</div>'
            })
            .state('library', {
                controller: 'LibraryController',
                controllerAs: 'lc',
                url: '/library',
                templateUrl: 'templates/library.html'
            })
            .state('question', {
                controller: 'QuestionController',
                controllerAs: 'qc',
                url: '/question/:id',
                templateUrl: 'templates/question.html'
            })
            .state('people', {
                controller: 'PersonController',
                controllerAs: 'pc',
                url: '/people',
                templateUrl: 'templates/people.html'
            })
            .state('person', {
                url: '/person/:id',
                template: '<person></person>'
            })
            .state('ratings', {
                url: '/ratings',
                templateUrl:'templates/ratings.html',
                controller:'MainCompCtrl',
                controllerAs: 'mc'
            })

            .state('cabinet', {
                controller: 'CabinetController',
                controllerAs: 'cc',
                url: '/cabinet',
                templateUrl: 'templates/cabinet.html'
            })
    })
        .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
    })
        .run(function(amMoment) {
        amMoment.changeLocale('ru');
    })
        .filter('currencyRub', function ($filter) {
        return function (item) {
            return $filter('currency')(item || 0, '', 2) + ' р.';
        };
    })
        .filter('fpreview', function () {
   return function (input) {
       return input + ' ...';
   }
})
        .component('wsToolbar',{
            templateUrl:'templates/components/ws-toolbar.html',
            controller: 'ToolbarController'
})
        .component('wsMenu',{
            templateUrl:'templates/components/ws-menu.html',
            controller: 'ToolbarController'
})
        .component('wsQuestion',{
    // controller:'MainController',
    bindings:{
      question: '<'
    },
    templateUrl:'templates/components/ws-question.html'
})
        .component('wsRatings',{
        controller: 'MainCompCtrl',
        templateUrl:'templates/components/ws-ratings.html'
    })
        .component('person', {
        controller: 'PersonController',
        templateUrl:'templates/components/ws-person.html'
    })
        .component('wsSideNav',{
            templateUrl:'templates/components/ws-sidenav.html',
            controller:'SidenavController'
})
        .component('wsMainComp',{
            templateUrl:'templates/components/ws-main.html',
            transclude:true
});
})();