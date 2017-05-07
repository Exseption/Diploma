angular.module('ws')
    .directive('answer', function () {
        return {
            transclude: true,
            template: `
<div class='row'>
    <div class='col s12'>
    <b>{{ans.person.name }} {{ans.person.surname}}</b>,&nbsp<span>{{ans.created | amUtc | amLocal | amDateFormat:'LLL'}}</span>
    <div style="text-indent: 20px"><span ng-transclude></span>{{ans.body}}</div>
    </div>
</div>
<answer-vote></answer-vote>
            `,
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
    .component('answerLite', {
        bindings: {
            a : '<'
        },
        template: `
        <article class='answer-in-question' style="padding: 0 15px">
    <div class='row'>
        <div class='row'>
            <span am-time-ago="$ctrl.a.created"></span>
           </div>
    </div>
    <div class="md-body-2">Оценка: {{$ctrl.a.mark}}</div>
    <div class='md-body-1 ws-body' style="padding-top: 5px; padding-bottom: 10px">{{$ctrl.a.body}}</div>
</article>
        
        `
    })
    .directive('answerCreate', function (AnswerService, SessionManager, $stateParams) {
        return {
            template:`
            <div>
    <form name="FormAnswer">
        <label for='answer-text'>Дайте свой ответ</label>
        <textarea rows='10' ng-model='answer_text' class='materialize-textarea validate' id='answer-text' required></textarea>
        <div class='md-body-1' layou='row'></div>
        <div class="row">
        </div>
        <div class="right-align">
        <a class='light-blue darken-3 btn'
               ng-click='answer(answer_text)' ng-disabled="FormAnswer.$invalid"><i class="material-icons">attach_file</i></a>
            <a class='light-blue darken-3 btn' 
            ng-click='answer(answer_text)' ng-disabled="FormAnswer.$invalid">Ответить</a>
        </div>
    </form>
            `,
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
                            AnswerService.createAnswer(question, answer_text, personId).then(function (res) {
                                elem.html("<h3>Спасибо за ваш ответ!</h3>")
                            })
                        }
                    }
                }
            }
        }
    })
    .directive('answerVote', function (SessionManager, VoteService) {
        return {
            template:`  
    <div class="valign-wrapper">
        <div class="col s12 right-align">
            <a class="btn-floating waves-effect waves-circle" ng-click='votePlus(ans.id)'><i class="material-icons fix_icons_align">thumb_up</i></a>
            <span class='chip center-align' ng-bind='ans.mark'></span>
            <a class="btn-floating waves-effect waves-circle" ng-click='voteMinus(ans.id)'><i class="material-icons fix_icons_align">thumb_down</i> </a>
        </div>
    </div>
            `,
            compile: function (elem, attrs) {
                return {
                    pre: function (scope, elem) {
                        if(!angular.isDefined(SessionManager.person)){
                            elem.remove();
                        }
                    },
                    post: function (scope, elem) {
                        scope.votePlus = function(id){
                            VoteService.votePlus(id).then(function (result) {
                                elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                                return result;
                            });
                        };
                        scope.voteMinus = function(id){
                            VoteService.voteMinus(id).then(function (result) {
                                elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                                return result;
                            });
                        };
                    }
                }
            }
        }
    })
    .service('VoteService', function (Restangular) {
        const self = this;
        self.votePlus = function (id) {
            return Restangular.all('vote/plus').post({
                id:id
            });
        };
        self.voteMinus = function (id) {
            return Restangular.all('vote/minus').post({id:id});
        }
    })