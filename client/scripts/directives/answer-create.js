angular.module('legal').directive('answerCreate', function (AnswerService) {
    return {
        template:["<div layout='column'>",
        "<div class='md-body-2'>Дать свой ответ</div>",
        "<textarea rows='10' ng-model='answer_text'></textarea>",
            "<div class='md-body-1' layou='row'></div>",
        "<div layout='row' layout-align='end end'>",
            "<button class='answer-button' layout-align='end end' " +
            "ng-click='answer(qc.question.id, answer_text)'>Ответить</button>",
            "</div>",
            "</div>"].join(""),
        link: function (scope, elem, attrs) {
            scope.answer = function (to_question, answer_text) {
                // alert(to_question+' '+ answer_text)
                AnswerService.createAnswer(to_question, answer_text, 1).then(function (res) {
                    console.log(res);
                })

            }
        }
    }
});