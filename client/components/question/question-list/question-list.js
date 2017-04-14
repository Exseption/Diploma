angular.module('legal').directive('questionList', function () {
    return {
        controller: 'home.ctrl',
        template: '<div ng-repeat="item in questions">' +
                        '<question-list-item item="item"></question-list-item>' +
                        '</div>'
    }
});