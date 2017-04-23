(function () {
    'use strict';
    angular.module('legal', [
        'ngMaterial',
        'restangular',
        'ui.router',
        'angularMoment',
        'ngCookies',
        'ngSanitize'
        ])

        .directive('chat', function (SessionManager, $rootScope) {
            return {
                controller: function ($scope, socket) {
                    socket.init('http://localhost:3009');

                    $scope.messages = [];
                    $scope.announces = [];
                    socket.on('s:mess', function (data) {
                        $scope.messages.push(data)
                    });
                    socket.on('message',function (data) {

                        if(data.type == 'announce'){
                            $scope.announces.push(data)
                        }
                        $scope.messages.push(data);
                    });

                    $scope.test = function (mess) {
                        const nick = SessionManager.person.name;
                        socket.emit('mess', { nick: nick, data: mess });
                        $scope.i_message = '';
                    }
                },
                template: "<form name='f'><label>Сообщение:</label><input ng-model='i_message' required id='mbody'><input type='submit' ng-click='test(i_message)' value='>' ng-disabled='f.$invalid'/></form><hr/>" +
                "<md-content><div ng-repeat='m in messages'>" +
                "<div class='md-caption'><b>{{m.nick}}</b><b>:</b> {{m.data}}</div>" +
                "<div ng-repeat='a in announces'>" +
                "<div>{{a.data}}</div>" +
                "</div>" +
                "</div></md-content>",
                compile: function () {
                    return {
                        pre: function (scope, elem) {
                            if(!angular.isDefined(SessionManager.person)){
                                elem.css('display', 'none');
                            }
                        },
                        post: function (scope, elem) {
                            $rootScope.$on('authenticated', function (e, data) {
                                elem.css('display', 'block')
                            })
                        }
                    }
                }
            }
        })

        .factory('socket',function ($rootScope){
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
                templateUrl:'components/index_page/index.html'
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

            .state('my_questions',{
                url:'/my_questions',
                templateUrl:'components/user/my_questions/my_questions.html'
            })
            .state('my_files',{
                url:'/my_files',
                templateUrl:'components/user/my_files/my_files.html'
            })
            .state('my_messages',{
                url:'/my_messages',
                templateUrl:'components/user/my_messages/my_messages.html'
            })
            .state('my_settings',{
                url:'/my_settings',
                templateUrl:'components/user/my_settings/my_settings.html'
            })

            // .state('private', {
            //     url:'/private',
            //     template:"<h3>Приватная зона</h3>",
            //     data: {
            //         needAdmin: true
            //     }
            // })
            .state('create', {
                url: '/create-question',
                template: '<create-question></create-question>'
            })
            .state('cabinet', {
                url: '/cabinet',
                templateUrl:'components/cabinet/cabinet.html'
            })

            .state('dialogs', {
                url:'person/:id/dialogs',
                template: '<dialogs></dialogs>'
            })
        })
        .run(function ($rootScope, SessionManager, $state) {
            $rootScope.$on('$stateChangeStart',
                function(event, to) {
                    if(to.data && to.data.needAdmin && SessionManager.person.usergroup !== 'admin'){
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