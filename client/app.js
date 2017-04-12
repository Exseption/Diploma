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
        // .config(function ($rootScope) {
        //     $rootScope.on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        //         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
        //     })
        // })

        .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider



            .state('public', {
                url: '/public',
                abstract: true,
                template: '<div><h3>Public page</h3>' +
                        '<a ui-sref=".news">First page</a>' +
                        '<a ui-sref=".data">Second page</a>' +
                        '<div ui-view></div>' +
                '</div>'
            })

            .state('public.news', {
                url: '/news',
                template: '<div>Дратути</div>'
            })
            .state('public.data', {
                url: '/data',
                template: '<div>Не дратути</div>'
            })

            .state('private', {
                url: '/private',
                abstract: true,
                template: '<ui-view/>'
            })
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////      Official API          /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

            // главная страница
            .state('index',{
                controller: 'MainController',
                controllerAs: 'mc',
                url:'/index',
                templateUrl:'templates/index.html'
            })


            //  над этими тремя подумать хорошенько
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

            // вопрос
            .state('ask',{
                url:'/ask',
                template:'<create-question></create-question>'
            })

            // поиск
            .state('search',{
                url:'/search',
                template:'<div>Поиск</div>'
            })

            // библиотека
            .state('library', {
                controller: 'LibraryController',
                controllerAs: 'lc',
                url: '/library',
                templateUrl: 'templates/library.html'
            })

            // страница вопроса
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


            // страница пользователя
            .state('person', {
                url: '/person/:id',
                template: '<person></person>'
            })

            //страница рейтингов
            .state('ratings', {
                url: '/ratings',
                templateUrl:'templates/ratings.html',
                controller:'MainCompCtrl',
                controllerAs: 'mc'
            })


            // личный кабинет. ага
            .state('cabinet', {
                controller: 'CabinetController',
                controllerAs: 'cc',
                url: '/cabinet',
                templateUrl: 'templates/cabinet.html'
            })
    })
        .run(function(amMoment) {
        amMoment.changeLocale('ru');
    })
        .filter('currencyRub', function ($filter) {
        return function (item) {
            return $filter('currency')(item || 0, '', 2) + ' р.';
        };
    })

        // фильтр превью вопроса на главной странице
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