(function(){
    'use strict';
    angular.module('legal').service('RatingService', function (Restangular) {
        const self = this;
        self.getRatings = function () {
            return Restangular.one('ratings','people').getList();
        };
        self.getRatingAnswers = function () {
            return Restangular.one('ratings','answers').getList();
        }
    });
})();