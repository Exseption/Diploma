angular.module('legal').directive('sidebar',function () {
    return{
        controller: function ($scope, PeopleService) {
            PeopleService.getRatings().then(function (ratings) {
                $scope.ratings = ratings;
            });
        },
        templateUrl:'shared/sidebar/sidebar.html'
    }
});