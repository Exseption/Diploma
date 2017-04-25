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
            .state('my_messages',{
                url:'/my_messages',
                templateUrl:'components/user/my_messages/my_messages.html'
            })
            .state('my_settings',{
                url:'/my_settings',
                templateUrl:'components/user/my_settings/my_settings.html'
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

        .directive('sidebar',function (SessionManager) { // sidebar
            return{
                controller: function ($scope, PeopleService) {
                    PeopleService.getRatings().then(function (ratings) {
                        $scope.ratings = ratings;
                    });
                }
                ,
                compile: function (elem) {
                    return {
                        pre: function (scope, elem) {
                            if(!angular.isDefined(SessionManager.person)){
                                    angular.element(document.querySelector('#admin')).css('display','none');
                                    angular.element(document.querySelector('#user')).css('display','none');
                            } else {
                                var role = SessionManager.person.usergroup;
                                if(role === 'user'){
                                    angular.element(document.querySelector('#admin')).css('display','none');
                                } else if(role === 'admin'){
                                    angular.element(document.querySelector('#user')).css('display','none');
                                }
                            }
                        },
                        post: function (scope, elem) {
                        }
                    }
                }
                ,
                templateUrl:'shared/sidebar/sidebar.html'
            }
        })

        .directive('svUsers', function (PeopleService, $mdDialog) {
            return {
                templateUrl:'components/supervisor/users/users.html',
                link: function (scope) {
                    PeopleService.getPeople().then(function (people) {
                        scope.people = people;
                    });
                    scope.edit_user = function (user) {
                        $mdDialog.show({
                            controller: function ($scope) {
                                $scope.user = user;
                            },
                            templateUrl: 'components/supervisor/users/resume.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose:true
                        });
                        // alert(user);
                    }
                }
            }
        })

        .directive('svQuestions', function (QuestionService) {
            return {
                templateUrl:'components/supervisor/questions/questions.html',
                link: function (scope) {
                    QuestionService.getQuestions().then(function (questions) {
                        scope.questions = questions;
                    })
                }
            }
        })

        .directive('mainHeader',function (SessionManager, $rootScope) {
            return {
                templateUrl:'shared/header/main-header.html',
                controller: function ($scope, $mdDialog) {
                    $scope.auth = function() {
                        $mdDialog.show({
                            controller: 'auth.form.ctrl',
                            templateUrl: 'shared/forms/auth/auth-form.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose:true
                        })
                            .then(function() {
                                },
                                function() {
                                });
                    }
                },
                compile: function (element, attr) {
                    return {
                        pre: function () {
                        },
                        post: function (scope, elem) {
                            $rootScope.$on('authenticated', function (event, data) {
                                console.log(data)
                            })

                        }
                    }
                }
            }
        })
        .controller('auth.form.ctrl', function ($scope, SessionManager, $mdDialog) {
            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.auth = function (login, password, cb) {
                SessionManager.auth(login, password, cb);
            }
        })



        .directive('answer', function () {
            return {
                transclude: true,
                templateUrl: "components/answer/answer.html",
                scope:{
                    ans: "<"
                }
            }
        })
        .service('AnswerService', function (Restangular) {
            const self = this;
            self.createAnswer = function (toquestion, body, author) {
                return Restangular.all('create/answer').post({
                    question: toquestion,
                    body: body,
                    author: author
                });
            }
        })

        .controller('QuestionController', function ($scope, $stateParams, QuestionService) {
            const id = $stateParams.id;
            QuestionService.getQuestion(id).then(function (question) {
                $scope.question = question;
            });

        })
        .directive('question', function () {
            return {
                templateUrl:'components/question/question.html',
                controller:'QuestionController'
            }
        })

        .service('QuestionService', function (Restangular) {
            const self = this;
            self.getMyQuestions = function (id) { // получить вопросы в кабинете
                return Restangular.one('questions/author', id).getList();
            };
            self.getQuestions = function () { //получаем все вопросы
                return Restangular.all('questions').getList();
            };
            self.getQuestion = function (id) {
                return Restangular.one('question',id).get();
            };
            self.createQuestion = function (title, body, author, payable, price) {
                return Restangular.all('create/question').post({
                    author: author,
                    body: body,
                    title: title,
                    payable: payable,
                    price: price
                })
            };
            self.deleteQuestion = function (id) {
                return Restangular.one('delete/question',id).remove();
            };

            self.getRatingAnswers = function () {
                return Restangular.one('ratings','answers').getList();
            };
        })


        .directive('myQuestions', function (QuestionService, SessionManager) {
            return {
                templateUrl:'components/user/my_questions/my_questions.html',
                link: function (scope) {
                    var id = SessionManager.person.id;
                    QuestionService.getMyQuestions(id).then(function (my_questions) {
                        scope.my_questions = my_questions;
                    })
                }

            }
        })

        .component('personComponent',{
            bindings:{
                pers:'<'
            },
            controller: function (PeopleService) {
                this.deletePerson = function (id) {
                    PeopleService.deletePerson(id);
                }
            },
            template:'<div layout="row" style="padding: 5px 10px"><div flex>{{$ctrl.pers.name}}</div>' +
            '<div flex>{{$ctrl.pers.surname}} </div>' +
            '<div flex><button ng-click="null">Редактировать</button></div>' +
            '<div flex><button ng-click="$ctrl.deletePerson($ctrl.pers.id)">Удалить</button></div>' +
            '</div><div layout="column"><div flex ng-repeat="q in $ctrl.pers.questions">{{q.title}}</div> </div>'
        })
        .component('answerLite', {
            bindings: {
                a : '<'
            },
            templateUrl: 'components/answer/answer-lite.html'
        })
        .directive('questionList', function (QuestionService) {
            return {
                controller: function ($scope) {
                    QuestionService.getQuestions().then(function (questions) {
                        $scope.questions = questions;
                    });
                },
                template:
                '<div ng-repeat="item in questions">' +
                '<question-list-item item="item"></question-list-item>' +
                '</div>'
            }
        })
        .directive('questionListItem', function () {
            return {
                templateUrl: 'components/question/question-list/question-list-item/question-list-item.html',
                scope: {
                    item: '<'
                }
            }
        })
        .directive('createQuestion', function (QuestionService, SessionManager, $rootScope) {
            return {
                templateUrl: 'components/question/creating/create-question.html',
                compile: function (elem, attrs) {
                    return {
                        pre: function (scope, elem) {
                            if(!angular.isDefined(SessionManager.person)){
                                elem.css('display', 'none');
                            }
                        },
                        post: function (scope, elem, attrs) {
                            $rootScope.$on('authenticated', function (e, data) {
                                elem.css('display', 'block');
                            })
                        }
                    }
                }
            }})

        .directive('answerCreate', function (AnswerService, SessionManager, $stateParams) {
            return {
                templateUrl:"../../components/answer/answer-create.html",
                compile: function (elem, attrs) {
                    return {
                        pre: function (scope, elem, attrs) {
                            if(SessionManager.person === undefined){
                                elem.remove();
                            }
                        },
                        post: function (scope, elem, attrs) {
                            scope.answer = function (answer_text) {
                                const personId = SessionManager.person.id;
                                const question = $stateParams.id;
                                // alert(question+' '+ personId+' '+ answer_text)
                                AnswerService.createAnswer(question, answer_text, personId).then(function (res) {
                                    // console.log(res);
                                    elem.html("<h3>Спасибо за ваш ответ!</h3>")
                                })
                            }
                        }
                    }
                }
            }
        })
        .service('DialogService', function (Restangular) {
            const self = this;
            self.getDialogs = function (id) {
                return Restangular.one('person', id).get('dialogs');
            }
        })
        .directive('dialogs', function (DialogService, SessionManager) {
            return {
                controller: function ($scope) {
                    const id = SessionManager.person.id;
                    console.log(id)
                    if(id){
                        DialogService.getDialogs(id).then(function (data) {
                            $scope.dialogs = data;
                        })
                    }

                },

                templateUrl: '../../components/dialog/messages.html'
            }
        })
        .directive('answerVote', function (RatingService, SessionManager) {
            return {
                template:[  "<div layout='row'>",
                    "<div flex='flex'>",
                    "<md-button class='md-icon-button fix-but plus-vote' ng-click='votePlus(ans.id)'>",
                    "<md-icon md-svg-icon='../assets/img/add.svg' aria-label='Плюс'></md-icon>",
                    "</md-button>" +
                    "<span class='md-body-2' ng-bind='ans.mark'></span>",
                    "<md-button class='md-icon-button fix-but minus-vote' ng-click='voteMinus(ans.id)'>",
                    "<md-icon md-svg-icon='../assets/img/remove.svg' aria-label='Минус'></md-icon>",
                    "</md-button>",
                    "</div>",
                    "</div>"].join(""),
                compile: function (elem, attrs) {
                    return {
                        pre: function (scope, elem) {
                            if(!angular.isDefined(SessionManager.person)){
                                elem.remove();
                            }
                        },
                        post: function (scope, elem) {
                            scope.votePlus = function(id){
                                RatingService.votePlus(id).then(function (result) {
                                    elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                                    return result;
                                });
                            };
                            scope.voteMinus = function(id){
                                RatingService.voteMinus(id).then(function (result) {
                                    elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                                    return result;
                                });
                            };
                        }
                    }
                }
            }
        })
        .directive('login', function (SessionManager, $rootScope) {
            return {
                template:'<a ng-click="auth()">Войти</a>',
                compile: function () {
                    return {
                        pre: function (scope, elem) {
                            if(!angular.isDefined(SessionManager.person)){
                                elem.css('display', 'block');
                            }
                        },
                        post: function (scope, elem) {
                            $rootScope.$on('authenticated', function (e, data) {
                                elem.css('display', 'none');
                            })
                            if(angular.isDefined(SessionManager.person)){
                                elem.css('display', 'none');
                            }
                        }
                    }
                }
            }
        })
        .directive('exitButton', function (SessionManager, $cookies, $state, $rootScope) {
            return {
                template:"<a ng-click='exit()'>Выход</a>",
                compile: function (elem, attrs, linker) {
                    return {
                        pre: function (scope, elem) {
                            if(!angular.isDefined(SessionManager.person)){
                                elem.css('display', 'none');
                            }
                        },
                        post: function (scope, elem) {
                            $rootScope.$on('authenticated', function (e, data) {
                                //TODO настроить появление
                                // elem.append("<button class='simple-button-primary md-button md-ink-ripple' " +
                                //     "type='button'  ng-click='exit()'>Выход</button>");
                                elem.css('display', 'block');
                            });

                            scope.exit = function () {
                                SessionManager.logout();
                                //TODO window reload
                            }
                        }
                    }
                }
            }
        })
        .directive('ask', function (SessionManager, $rootScope, $mdDialog, QuestionService, $mdToast) {
            return {
                template: '<a ng-click="openQuestionDialog()">Задать вопрос</a>',
                controller: function ($scope) {
                    $scope.openQuestionDialog = function(ev) {
                        $mdDialog.show({
                            controller: function ($scope) {
                                $scope.hide = function () {
                                    $mdDialog.hide();
                                };
                                $scope.payable = 'free';
                                $scope.createQuestion = function (title, body, author, payable, price ) {
                                    const personId = SessionManager.person.id;
                                    if(payable === 'free'){
                                        payable = false;
                                    } else {
                                        payable = true;
                                    }
                                    QuestionService.createQuestion(title, body, personId, payable, price).then(function (result) {
                                        console.log(result);
                                        $mdDialog.hide();
                                        $mdToast.show(
                                            $mdToast.simple()
                                                .textContent('Вопрос успешно задан!')
                                                .hideDelay(5000)
                                        )
                                    })
                                }
                            },
                            templateUrl: '../../components/question/creating/create-question.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose:true
                        })
                    };
                },
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
        .directive('reg', function ($mdDialog, SessionManager, PeopleService, $rootScope) {
            return {
                template:"<a ng-click='register()'>Регистрация</a>",
                controller: function ($scope) {
                    $scope.register = function () {
                        $mdDialog.show({
                            controller: function ($scope) {
                                $scope.cancel = function () {
                                    $mdDialog.hide();
                                };
                                $scope.register = function (login, password, name, surname, email,
                                                            birthday, country, area, city, telephone) {
                                    PeopleService.registerPerson(login, password, name, surname, email,
                                        birthday, country, area, city, telephone)
                                        .then(function (success) {
                                            $mdDialog.hide();
                                        }, function (error) {
                                            alert('Ошибка!!!')
                                        })
                                }
                            },
                            templateUrl: 'shared/buttons/reg.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose:true
                        })
                            .then(function() {

                                },
                                function() {

                                });
                    };
                },
                compile: function () {
                    return {
                        pre: function (scope, elem) {
                            if(angular.isDefined(SessionManager.person)){
                                elem.remove();
                            }
                        },
                        post: function (scope, elem) {
                            $rootScope.$on('authenticated', function (e, data) {
                                elem.remove();
                            })
                        }
                    }
                }

            }
        })
        .service('VoteService', function (Restangular) {
            const self = this;
            self.votePlus = function (id) {
                return Restangular.all('vote/plus').post({id:id});
            };
            self.voteMinus = function (id) {
                return Restangular.all('vote/minus').post({id:id});
            }
        })
        .directive('person', function (PeopleService) {
            return {
                controller: function($scope, $stateParams){
                    const id = $stateParams.id;
                    if(id){
                        PeopleService.getPerson(id).then(function (person) {
                            $scope.person = person;
                        });
                    }
                    PeopleService.getPeople().then(function (people) {
                        $scope.people = people;
                    });
                },
                templateUrl:'components/person/person.html'
            }
        })
        .service('LibraryService', function (Restangular) {
            const self = this;
            self.getBooks = function () {
                return Restangular.all('library').getList();
            }
        })
        .directive('library', function (LibraryService) {
            return {
                controller: function ($scope) {
                    LibraryService.getBooks().then(function (data) {
                        $scope.books = data
                    });
                },
                templateUrl:'components/library/library.html'
            }
        })

})();