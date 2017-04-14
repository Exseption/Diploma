angular.module('legal').directive('answer', function () {
    return {
        transclude: true,
        templateUrl: "components/answer/answer.html",
        scope:{
            ans: "<"
        }
    }
});