(function(){
    'use strict';
    angular.module('legal').service('RatingService', function (Restangular) {
        const self = this;
        self.getRatings = function () {
            return Restangular.one('ratings','people').getList();
        };
        self.getRatingAnswers = function () {
            return Restangular.one('ratings','answers').getList();
        };
        self.votePlus = function (id) {
            return Restangular.all('vote/plus').post({id:id})
        };
        self.voteMinus = function (id) {
            return Restangular.all('vote/minus').post({id:id}).then(function (result) {
                return result;
            });
        }
    });
})();