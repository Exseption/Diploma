angular.module('legal').directive('sidebar',function () {
    return{
        controller: function ($scope, RatingService) {

            RatingService.getRatings().then(function (ratings) {
                $scope.ratings = ratings;
            });
            RatingService.getRatingAnswers().then(function (answers) {
                $scope.answers = answers;
            });
        },
        templateUrl:'shared/sidebar/sidebar.html'
    }
});