(function () {
    'use strict';
    angular.module('legal').service('QuestionsService', function (Restangular) {
        var self = this;
        self.getAll = function () {
            Restangular.oneUrl('test', 'http://localhost:3009/test/all').get()
                .then(function (response) {
                    return response;
                }, function (error) {
                    console.log(error)
                })
        }
    })
})();
