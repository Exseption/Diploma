(function () {
    angular.module('legal').controller('MainController', function (Restangular) {
        const self = this;
        self.questions = [];


            Restangular.oneUrl('test', 'http://localhost:3009/test/all').get()
                .then(function (response) {
                    self.questions = response;
                }, function (error) {
                    console.log(error)
                })



    });
})();
