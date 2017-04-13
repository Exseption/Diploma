angular.module('legal').directive('wsRatings',function () {
    return{
        controller: 'RatingController',
        templateUrl:'../../shared/sidebar/ws-ratings.html'
    }
});