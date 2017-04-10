angular.module('legal').component('createQuestion', {
    templateUrl: '../../templates/create-question.html',
    controller: function (QuestionService) {
        this.createQuestion = function (title, body, author, payable, price ) {
            //TODO также сдедалть авторство от сессии
            QuestionService.createQuestion(title, body, 1, payable, price).then(function (result) {
                alert(result)
            },function (error) {
                alert(error);
            })
            // alert(title +' '+ body+' '+  1 +' '+  payable+' '+ price)
        };
    }
});