angular.module('legal').directive('answer', function () {
    return {
        templateUrl: "components/answer/answer.html",
        scope:{
            ans: "<"
        }
    }
});