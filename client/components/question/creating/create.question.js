angular.module('legal').directive('createQuestion', function (QuestionService, SessionManager) {
return {
    templateUrl: 'components/question/creating/create-question.html',
    compile: function (elem, attrs) {
        return {
            pre: function (scope, elem) {
                if(!angular.isDefined(SessionManager.person)){
                    elem.remove();
                }
            },
            post: function (scope, elem, attrs) {
                scope.createQuestion = function (title, body, author, payable, price ) {
                    //TODO также сдедалть авторство от сессии
                    const personId = SessionManager.person.id;

                    QuestionService.createQuestion(title, body, personId, payable, price).then(function (result) {
                        elem.html("<div class='md-subhead'>" +
                            "Спасибо за ваш вопрос, наши сообщество обязательно попытается на него ответить!</div>")
                    })
                }
            }
        }
    }
}});