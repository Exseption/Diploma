(function () {
    'use strict';
    angular.module('legal', [
        'ngMaterial',
        'restangular',
        'ui.router',
        'angularMoment',
        'ngCookies',
        'md.data.table',
        'ngSanitize',
        'btford.socket-io'
        ])

        .factory('socket',function ($rootScope){
            var socket = io.connect();
            return {
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
            .state('private', {
                url:'/private',
                template:"<h3>Приватная зона</h3>",
                data: {
                    needAdmin: true
                }
            })
            .state('create', {
                url: '/create-question',
                template: '<create-question></create-question>'
            })
            .state('cabinet', {
                url: '/cabinet',
                templateUrl:'components/cabinet/cabinet.html'
            })

            .state('dialogs', {
                url:'/dialogs',
                template: '<dialogs></dialogs>'
            })
            // .state('user/questions', {
            //     url:'user/:id/questions',
            //     templateUrl: 'templates/my-questions.html'
            //
            // })
            // вопрос
            // .state('ask',{
            //     url:'/ask',
            //     template:'<create-question></create-question>'
            // })
            // поиск
            // .state('search',{
            //     url:'/search',
            //     template:'<div>Поиск</div>'
            // })
            // библиотека

            // страница вопроса

            // .state('people', {
            //     controller: 'PersonController',
            //     controllerAs: 'pc',
            //     url: '/people',
            //     templateUrl: 'components/ratings/people.html'
            // })
            // страница пользователя

            //страница рейтингов
            // .state('ratings', {
            //     url: '/ratings',
            //     templateUrl:'components/ratings/ratings.html',
            //     controller:'RatingController',
            //     controllerAs: 'mc'
            // }
            // )
        })
        .run(function ($rootScope, SessionManager, $state) {
            $rootScope.$on('$stateChangeStart',
                function(event, to) {
                    if(to.data && to.data.needAdmin){
                        event.preventDefault();
                        alert('Нужен доступ админа!');
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
        .filter('fpreview', function () {
            return function (input) {
            return input + ' ...';
            }
        }
    )
})();