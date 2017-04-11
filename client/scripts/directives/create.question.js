angular.module('legal').directive('createQuestion', function (QuestionService) {
return {
    templateUrl: '../../templates/directives/create-question.html',
    link: function (scope, elem, attrs) {
        scope.createQuestion = function (title, body, author, payable, price ) {
            //TODO также сдедалть авторство от сессии
            QuestionService.createQuestion(title, body, 1, payable, price).then(function (result) {
                elem.html("<div class='md-subhead'>Спасибо за ваш вопрос, наши сообщество обязательно попытается на него ответить!</div>")
            })
        }
    }
}});