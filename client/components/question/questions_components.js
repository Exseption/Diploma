angular.module('ws')
    .directive('question', function () {
        return {
            templateUrl:'components/question/question.html',
            controller:function ($scope, $stateParams, QuestionService) {
                const id = $stateParams.id;
                QuestionService.getQuestion(id).then(function (question) {
                    $scope.question = question;
                    console.log(question)
                });
            }
        }
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
    .service('QuestionService', function (Restangular) {
        const self = this;
        self.getMyQuestions = function (id) { // получить вопросы в кабинете
            return Restangular.one('questions/author', id).getList();
        };
        self.save_question_changes = function (title, body, closed, payable, money, questionId) {
          return Restangular.all('question/save_changes').post({
              title: title,
              body: body,
              closed: closed,
              payable: payable,
              money: money,
              id: questionId
          })
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