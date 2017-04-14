angular.module('legal').directive('answerCreate', function (AnswerService, SessionManager) {
    return {
        template:["<div layout='column'>",
        "<div class='md-body-2'>Дать свой ответ</div>",
        "<textarea rows='10' ng-model='answer_text'></textarea>",
            "<div class='md-body-1' layou='row'></div>",
        "<div layout='row' layout-align='end end'>",
            "<button class='answer-button' layout-align='end end' " +
            "ng-click='answer(question.id, answer_text)'>Ответить</button>",
            "</div>",
            "</div>"].join(""),
        compile: function (elem, attrs) {
            return {
                pre: function (scope, elem, attrs) {
                    if(SessionManager.person === undefined){
                        elem.remove();
                    }
                },
                post: function (scope, elem, attrs) {
                    scope.answer = function (to_question, answer_text) {
                        //TODO сделать зависимость авторства от сессии пользователя
                        const personId = SessionManager.person.id;
                        AnswerService.createAnswer(to_question, answer_text, personId).then(function (res) {
                            console.log(res);
                            elem.html("<h3>Спасибо за ваш ответ!</h3>")
                        })

                    }
                }
            }
        }
    }
});