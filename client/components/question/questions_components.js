angular.module('ws')
    .directive('question', function () {
        return {
            template: `
<div class="z-depth-1 view-cntr">
  <div class="row">
    <div class="col s12">
      <div>
          <h5>{{question.title}}</h5>
          <span ui-sref="person({id: question.person.id})">{{question.person.name}} {{question.person.surname}}</span>
          ,&nbsp;<span am-time-ago="question.created"></span>
          <div ng-bind-html="question.body"></div>
        <div>
          <div>
            <div class="divider"></div>
            Ответы
          </div>
          <div ng-repeat="ans in question.answers">
            <answer ans="ans">{{$index+1}}.</answer>
          </div>
          <answer-create to="question.id"></answer-create>
        </div>
      </div>
    </div>
  </div>
</div>`,
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
                QuestionService.digest_questions().then(function (questions) {
                    $scope.questions = questions;
                });
            },
            template:`
                        <div class="view-cntr">
                                                <ask-main-page></ask-main-page>
                        <div class="row grey lighten-4" style="padding: 10px 0">
                        <div class="col valign-wrapper s12" style="min-height: 38px"><b>ПОСЛЕДНИЕ ВОПРОСЫ</b></div>
                        </div>
                        <div style="background-color: white"><div ng-repeat="item in questions">
                                    <question-list-item item="item"></question-list-item>
                                                </div>
                                                </div>
                                                <news bc="grey lighten-4"></news>
                        </div>
`
        }
    })
    .directive('questionListItem', function () {
        return {
            template: `
<div class="section z-depth-1" style="padding: 5px 10px; margin: 15px 10px">
    <div class="valign-wrapper you_may_click_here question_title" ui-sref="question({id : item.id})">{{item.title}}
    <span ng-show="item.price" class="new badge price_chip">{{item.price}} руб.</span>
    <span class="new badge red lighten-1">{{item.answers.length | badge_caption}}</span> </div>
    <div style="padding-left: 15px"> 
      <span class="you_may_click_here" ng-show="item.person" ui-sref="person({id: item.person.id})">
        {{item.person.name}} {{item.person.surname}}</span>,&nbsp<span am-time-ago="item.created"></span>
    <div class="divider"></div>
    </div>
    <div class="truncate" ng-bind-html="item.body"></div>
</div>
`,
            scope: {
                item: '<'
            }
        }
    })
    .directive('searchQuestion' , function (Restangular) {
        return {
            template: `<div class="view-cntr" style="min-height: 70vh">
<div class="row">
    <form class="col s12">
        <div class="row" style="margin-bottom: 0">
            <div class="col s2">
                <legend>Область поиска</legend>
                <div>
                    <input name="search_type" id="questions" type="radio" value="quest" ng-model="type_search">
                    <label for="questions">Вопросы</label>
                </div>
                <div>
                    <input name="search_type" id="people" type="radio" value="peop" ng-model="type_search">
                    <label for="people">Участники</label>
                </div>
            </div>
            <div class="col s10" ng-show="type_search === 'peop'">
                <fieldset>
                    <legend>Настройки</legend>
                    <div class="col s4">
                        <label for="country">Страна</label>
                        <input ng-model="_country" id="country" class="validate" type="text">
                    </div>
                    <div class="col s4">
                        <label for="area">Область, край</label>
                        <input ng-model="_area" id="area" class="input">
                    </div>
                    <div class="col s4">
                        <label for="city">Город</label>
                        <input ng-model="_city" id="city" class="input">
                    </div>

                </fieldset>

            </div>
        </div>
        <div class="row">
            <div class="col s6">
                <div class="input-field">
                    <input id="search" type="search" ng-model="sq" my-enter="search_question(sq)" required>
                    <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                </div>
            </div>

        </div>
    </form>
            <div class="col s12" ng-if="results">
                <div>Результаты:</div><div class="divider"></div>
                <div ng-repeat="res in results">
                    <div class="row">
                        <div class="col s12">
                            <div class="search_result" ui-sref="question({id: res.id})"><b>{{$index + 1}}. {{res.title}}</b></div>
                            <div class="col s12">{{res.body}}</div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>`,
            link: function (scope) {
                scope.search_question = function (sq) {
                        Restangular.all('search').post({
                            body: sq
                        }).then(function (results) {
                            scope.results = results;
                            console.log(results.plain())
                        })
                }
            }
        }
    })

    .directive('questionsAll', function (QuestionService) {
        return {
            template: `
            <div class="view-cntr">
<div class="row">
<div class="col s12">
<div style="background-color: white"><div ng-repeat="item in questions">
                                    <question-list-item item="item"></question-list-item>
                                                </div>
                                                </div>
</div>
</div>
            </div>
            `,
            link: function (scope) {
                QuestionService.getQuestions().then(function (questions) {
                    scope.questions = questions;
                })
            }
        }
    })

    .service('QuestionService', function (Restangular) {
        const self = this;
        self.archive = function () {
            return Restangular.all('archive').getList();
        };
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
        self.digest_questions = function () {
            return Restangular.all('questions/digest').getList();
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