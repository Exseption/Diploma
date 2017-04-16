angular.module('legal').directive('createQuestion', function (QuestionService, SessionManager, $rootScope) {
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
}});