angular.module('legal').directive('wsRatings',function () {
    return{
        controller: 'RatingController',
        templateUrl:'templates/directives/ws-ratings.html'
    }
})