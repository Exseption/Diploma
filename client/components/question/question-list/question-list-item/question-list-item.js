angular.module('legal').directive('questionListItem', function () {
    return {
        templateUrl: 'components/question/question-list/question-list-item/question-list-item.html',
        scope: {
            item: '<'
        }
    }
});
