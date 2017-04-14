angular.module('legal').directive('questionListItem', function () {
    return {
        templateUrl: 'components/home/home.html',
        scope: {
            item: '<'
        }
    }
});
