angular.module('legal').directive('answerVote', function (RatingService, SessionManager) {
    return {
        template:[  "<div layout='row'>",
                    "<div flex='flex'>",
                    "<md-button class='md-icon-button fix-but plus-vote' ng-click='votePlus(ans.id)'>",
                    "<md-icon md-svg-icon='../assets/img/add.svg' aria-label='Плюс'></md-icon>",
                    "</md-button>" +
                    "<span class='md-body-2' ng-bind='ans.mark'></span>",
                    "<md-button class='md-icon-button fix-but minus-vote' ng-click='voteMinus(ans.id)'>",
                    "<md-icon md-svg-icon='../assets/img/remove.svg' aria-label='Минус'></md-icon>",
                    "</md-button>",
                    "</div>",
                    "</div>"].join(""),
        compile: function (elem, attrs) {
            return {
                pre: function (scope, elem) {
                    if(!angular.isDefined(SessionManager.person)){
                        elem.remove();
                    }
                },
                post: function (scope, elem) {
                    scope.votePlus = function(id){
                        RatingService.votePlus(id).then(function (result) {
                            elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                            return result;
                        });
                    };
                    scope.voteMinus = function(id){
                        RatingService.voteMinus(id).then(function (result) {
                            elem.html("<div class='md-body-2'>Спасибо за ваш голос!</div>");
                            return result;
                        });
                    };
                }
            }
        }
    }
});