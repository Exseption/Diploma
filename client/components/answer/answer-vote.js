angular.module('legal').directive('answerVote', function (RatingService) {
    return {
        template:["<div layout='row'>",

                    "<div flex='flex'>",
                    "<md-button class='md-icon-button fix-but' id='plus-vote' ng-click='votePlus(ans.id)'>",
                    "<md-icon md-svg-icon='../assets/img/add.svg'></md-icon>",
                    "</md-button>" +
                    "<span class='md-body-2'>{{ans.mark}}</span>",
                    "<md-button class='md-icon-button fix-but' id='minus-vote' ng-click='voteMinus(ans.id)'>",
                    "<md-icon md-svg-icon='../assets/img/remove.svg'></md-icon>",
                    "</md-button>",
                    "</div>",
                    "</div>"].join(""),
        link: function (scope, elem, attrs) {
            scope.votePlus = function(id){
                RatingService.votePlus(id).then(function (result) {
                    elem.html("<div class='md-caption'>Спасибо за ваш голос!</div>");
                    // elem.append("<h3>Агааа!!!</h3>")
                    return result;
                });
            };
            scope.voteMinus = function(id){
                RatingService.voteMinus(id).then(function (result) {
                    elem.html("<div class='md-caption'>Спасибо за ваш голос!</div>");
                    return result;
                });
            };
        }
    }
});