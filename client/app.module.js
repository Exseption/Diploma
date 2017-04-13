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
                templateUrl:'components/home/home.html'
            })


            //  над этими тремя подумать хорошенько
            // .state('messages', {
            //     controller:'MessageController',
            //     controllerAs: 'mc',
            //     url:'/:id/messages',
            //     templateUrl: 'templates/messages.html',
            //     data: {
            //         auth: true
            //     }
            // })
            .state('dialogs', {
                controller: 'MessageController',
                controllerAs: 'mc',
                url: '/:id/dialog/:dialog/messages',
                templateUrl: 'components/dialog/dialog.html',
                data: {
                    needAuth: true
                }
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
                templateUrl: 'components/library/library.html'
            })

            // страница вопроса
            .state('question', {
                controller: 'QuestionController',
                controllerAs: 'qc',
                url: '/question/:id',
                templateUrl: 'components/question/question.html'
            })

            .state('people', {
                controller: 'PersonController',
                controllerAs: 'pc',
                url: '/people',
                templateUrl: 'components/ratings/people.html'
            })


            // страница пользователя
            .state('person', {
                url: '/person/:id',
                template: '<person></person>'
            })

            //страница рейтингов
            .state('ratings', {
                url: '/ratings',
                templateUrl:'components/ratings/ratings.html',
                controller:'RatingController',
                controllerAs: 'mc'
            })

            // личный кабинет. ага
            .state('cabinet', {
                controller: 'CabinetController',
                controllerAs: 'cc',
                url: '/cabinet',
                templateUrl: 'components/private/cabinet.html'
            })
    })
        .run(function ($rootScope) {
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, error) {
                    console.log(event);
                    console.log(toState);
                    console.log(toParams);
                }
            );
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
})();