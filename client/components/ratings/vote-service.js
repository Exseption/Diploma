(function(){
    'use strict';
    angular.module('legal').service('VoteService', function (Restangular) {
        const self = this;
        self.votePlus = function (id) {
            return Restangular.all('vote/plus').post({id:id});
        };
        self.voteMinus = function (id) {
            return Restangular.all('vote/minus').post({id:id});
        }
    });
})();