angular.module('legal').directive('answerCreate', function (AnswerService, SessionManager, $stateParams) {
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
});