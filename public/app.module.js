(function () {
    'use strict';
    angular.module('ws', [
        'ngMaterial',
        'restangular',
        'ui.router',
        'angularMoment',
        'ngCookies',
        'ngSanitize'
        ])

        .factory('socket',function ($rootScope){ //socket factory for dialogs
            var socket;
            return {
                init: function (url) {
                    socket = io(url);
                },
                on: function (eventName,callback){
                    socket.on(eventName,function(){
                        var args = [].slice.call(arguments);
                        $rootScope.$apply(function(){
                            if(callback){
                                callback.apply(socket,args);
                            }
                        });
                    });
                },
                emit: function (eventName, data, callback){
                    var args = [].slice.call(arguments), cb;
                    if( typeof args[args.length-1]  == "function" ){
                        cb = args[args.length-1];
                        args[args.length-1] = function(){
                            var args = [].slice.call(arguments);
                            $rootScope.$apply(function(){
                                if(cb){
                                    cb.apply(socket,args);
                                }
                            });
                        };
                    }
                    socket.emit.apply(socket, args);
                }
            };
        })
        .constant('_', window._)
        .config(function(RestangularProvider){
        RestangularProvider
            .setBaseUrl('http://localhost:3009/api/v1');
         })
        .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index',{
                url:'/index',
                template:'<question-list></question-list>'
            })
            .state('feedback', {
                url: '/feedback',
                template: `<feedback></feedback>`
            })
            .state('help', {
                url: '/help',
                template: `<help></help>`
            })
            .state('archive', {
                url: '/archive',
                template: `<archive></archive>`
            })
            .state('questions', {
                url: '/questions',
                template: `<questions-all></questions-all>`
            })
            .state('news', {
                url: '/news',
                template: `<page-container><news bc="blue lighten-4"></news></page-container>
`
            })
            .state('search', {
                url: '/search',
                template: '<search-question></search-question>'
            })
            .state('question', {
            url: '/question/:id',
            template: '<question></question>'
            })
            .state('person', {
            url: '/person/:id',
            template: '<person></person>'
            })
            .state('library', {
                url: '/library',
                template: '<library></library>'
            })
            .state('category',{
                parent:'library',
                url:'/category/:cat',
                template:'<lib-category></lib-category>'
            })
            .state('about', {
                url: '/about',
                template: '<about></about>'
            })
            .state('my_questions',{
                url:'/my_questions',
                template: '<my-questions></my-questions>'
            })
            .state('my_dialogs', {
                url:'/my_dialogs',
                views: {
                    '': {
                        template: `<div class="view-cntr"><div ui-view></div></div>`
                    },
                    "_dialogs": {
                        template: '<my-dialogs></my-dialogs>'
                    }
                }
            })
            .state('my_messages', {
                parent: 'my_dialogs',
                url:'/my_messages/:dialogId',
                views: {
                  '' : {
                      template: `<my-messages></my-messages>`
                  }
                },
                template:'<my-messages></my-messages>'
            })
            .state('my_settings', {
                url:'/my_settings',
                template:'<my-settings></my-settings>'
            })
            .state('people',{
                url:'/people',
                template: '<people-list></people-list>'
            })
            .state('sv_users',{
                url:'/supervisor/users',
                template:'<sv-users></sv-users>',
                data: {
                    needAdmin: true
                }
            })
            .state('sv_answers',{
                url:'/supervisor/answers',
                template: `<sv-answers></sv-answers>`,
                data: {
                    needAdmin: true
                }
            })
            .state('sv_feedback',{
                url:'/supervisor/feedback',
                template:`<sv-feedback></sv-feedback>`,
                data: {
                    needAdmin: true
                }
            })
            .state('sv_questions',{
                url:'/supervisor/questions',
                template:'<sv-questions></sv-questions>',
                data: {
                    needAdmin: true
                }
            })
            .state('sv_settings',{
                url:'/supervisor/settings',
                template: `<sv-settings></sv-settings>`,
                data: {
                    needAdmin: true
                }
            })
            .state('sv_pages',{
                url:'/supervisor/pages',
                template:`<sv-pages></sv-pages>`,
                data: {
                    needAdmin: true
                }
            })
            .state('sv_pages.adm_news',{
                url:'/news',
                template: `<adm-news-create></adm-news-create>`
            })
            .state('sv_pages.adm_help',{
                url: '/help',
                template: `<sv-help></sv-help>`
            })
            .state('sv_pages.adm_about',{
                url: '/about',
                template: `<about-us></about-us>`
            })
            .state('sv_library',{
                url:'/supervisor/library',
                template: `<sv-library></sv-library>`,
                data: {
                    needAdmin: true
                }
            })
            .state('create', {
                url: '/create-question',
                template: '<create-question></create-question>'
            })
        })
        .run(function ($rootScope, SessionManager, $state) {
            $rootScope.$on('$stateChangeStart',
                function(event, to) {
                      if(to.data && to.data.needAdmin && SessionManager.person.usergroup !== 'admin'){
                        event.preventDefault();

                        $state.go('index');
                    }
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
        .filter('group_filter', function () {
            return function (group) {
                return group === 'user' ? 'Пользователь' : 'Администратор';
            }
        })

        .filter('true_false', function () {
            return function (bool) {
                return bool === true ? 'Да' : 'Нет'
            }
        })
        .filter('pay_free', function () {
            return function (payable) {
                return payable === true ? 'Платный' : 'Бесплатный'
            }
        })
        .filter('badge_caption', function () {
            return function (length) {
                let caption;
                switch (length) {
                    case 0 :
                        caption = length + ' ответов';
                        break;
                    case 1 :
                        caption = length + ' ответ';
                        break;
                    case 2 :
                        caption = length + ' ответа';
                        break;
                    case 3 :
                        caption = length + ' ответа';
                        break;
                    case 4 :
                        caption = length + ' ответа';
                        break;
                    default:
                        caption = length + ' ответов';
                }
                return caption;
            }
        })
})();