angular.module('ws')
    .directive('answer', function () {
        return {
            transclude: true,
            template: `
<div class='row'>
    <div class='col s12'>
    <b>{{ans.person.name }} {{ans.person.surname}}</b>,&nbsp<span>{{ans.created | amUtc | amLocal | amDateFormat:'LLL'}}</span>
    <div><span ng-transclude></span> {{ans.body}}</div>
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
    <div layout='row'>
        <div layout='row'>
            <!--{{$ctrl.a.created | amUtc | amLocal | amDateFormat:'LLL'}}-->
            <!--{{$ctrl.a.created | amUtc | amLocal | amDateFormat:'LLL'}}-->
            <span am-time-ago="$ctrl.a.created"></span>
           </div>
        <div flex='flex'>

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
            <div layout='column'>
    <form name="FormAnswer">
        <label for='answer-text'>Дайте свой ответ</label>
        <textarea rows='10' ng-model='answer_text' class='materialize-textarea validate' id='answer-text' required></textarea>
        <div class='md-body-1' layou='row'></div>

        <div class="row">

        </div>
        <!--<div class="file-field input-field col s5 ">-->
            <!--<div class="btn">Файл-->
                <!--<input type="file">-->
            <!--</div>-->
            <!--<div class="file-path-wrapper">-->
                <!--<input class="file-path validate" type="text">-->
            <!--</div>-->
        <!--</div>-->

        <div layout='col s7' layout-align='end end'>
            <a class='light-blue darken-3 btn' layout-align='end end'
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
    .directive('answerVote', function (SessionManager) {
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
                        // if(!angular.isDefined(SessionManager.person)){
                        //     elem.remove();
                        // }
                    },
                    post: function (scope, elem) {
                        scope.votePlus = function(id){
                            // RatingService.votePlus(id).then(function (result) {
                            //     elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                            //     return result;
                            // });
                        };
                        scope.voteMinus = function(id){
                            // RatingService.voteMinus(id).then(function (result) {
                            //     elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                            //     return result;
                            // });
                        };
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