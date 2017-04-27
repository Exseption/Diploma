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

        .filter('true_false', function () {
            return function (bool) {
                return (bool === true) ? 'Активен' : 'Закрыт'
            }
        })
        .filter('pay_free', function () {
            return function (payable) {
                return (payable === true) ? 'Платный' : 'Бесплатный'
            }
        })

        .config(function(RestangularProvider){
        RestangularProvider
            .setBaseUrl('http://localhost:3009/api/v1');
         })
        .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index',{ // index page
                url:'/index',
                templateUrl:'components/index_page/index.html'
            })
            .state('question', { // selected question
            url: '/question/:id',
            template: '<question></question>'
            })
            .state('person', { // selected person
            url: '/person/:id',
            template: '<person></person>'
            })
            .state('library', { // library page
                url: '/library',
                template: '<library></library>'
            })

///////////////////////////////////////////////////////////////////////////////////////
            //private
            .state('my_questions',{
                url:'/my_questions',
                template: '<my-questions></my-questions>'
            })
            .state('my_files',{
                url:'/my_files',
                templateUrl:'components/user/my_files/my_files.html'
            })
            //TODO
            .state('my_dialogs', {
                url:'/my_dialogs',
                templateUrl:''
            })
            .state('my_messages',{
                url:'/my_messages',
                template:'<my-dialogs></my-dialogs>'
            })
            .state('my_settings',{
                url:'/my_settings',
                template:'<my-settings></my-settings>'
            })

//////////////////////////////////////////////////////////////////////////////////////
            //supervisor
            .state('sv_users',{
                url:'/supervisor/users',
                template:'<sv-users></sv-users>',
                data: {
                    needAdmin: true
                }
            })
            .state('sv_answers',{
                url:'/supervisor/answers',
                templateUrl:'components/supervisor/answers/answers.html',
                data: {
                    needAdmin: true
                }
            })
            .state('sv_dialogs',{
                url:'/supervisor/dialogs',
                templateUrl:'components/supervisor/dialogs/dialogs.html',
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
                templateUrl:'components/supervisor/settings/settings.html',
                data: {
                    needAdmin: true
                }
            })
            .state('sv_pages',{
                url:'/supervisor/pages',
                templateUrl:'components/supervisor/pages/pages.html',
                data: {
                    needAdmin: true
                }
            })
            .state('sv_library',{
                url:'/supervisor/library',
                templateUrl:'components/supervisor/library/library.html',
                data: {
                    needAdmin: true
                }
            })
//////////////////////////////////////////////////////////////////////////////////////


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


        .service('SessionManager', function ($cookies, $http, $mdDialog, $rootScope) { // session manager
            const self = this;
            const url ='http://localhost:3009/api/v1/';

            if($cookies.getObject('person')){
                self.person = $cookies.getObject('person');
            }

            self.auth = function(login, password, cookie) {
                return $http.post(url + 'auth', 'login=' + login + '&pwd=' + password, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }}).then(function (response) {
                    if(_.isEmpty(response.data)){
                        alert('Неправильный логин или пароль!!!');
                        return;
                    }
                    console.log(cookie);
                    if(cookie){
                        $cookies.putObject('person', response.data[0]);
                    }

                    $rootScope.$emit('authenticated', response.data[0].name + ' ' + response.data[0].surname + ' successfully authenticated!' );
                    self.person = response.data[0];
                    $mdDialog.hide();
                }, function (error) {
                    console.log(error);
                });
            };
            self.logout = function () {
                delete self.person;
                $cookies.remove('person');
            };
        })

        .service('PeopleService', function (Restangular) {
            const self = this;
            self.deletePerson = function (id) {
                return Restangular.one('delete/person',id).remove();
            };

            self.getRatings = function () {
                return Restangular.one('ratings','people').getList();
            };

            self.getPerson = function (id) {
                return Restangular.one('person', id).get();
            };
            self.getPeople = function () {
                return Restangular.all('people').getList();
            };
            self.registerPerson = function (login, password, name, surname, email, birthday, country, area, city, telephone) {
                return Restangular.all('create/person').post({
                    login: login,
                    password: password,
                    name: name,
                    surname: surname,
                    email: email,
                    birthday: birthday,
                    country: country,
                    area: area,
                    city: city,
                    telephone: telephone
                })
            }
        })
})();