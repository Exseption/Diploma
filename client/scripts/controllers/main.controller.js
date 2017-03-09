(function () {
    angular.module('legal').controller('MainController', function (QueryService) {
        const self = this;
            // Restangular.oneUrl('test', 'http://localhost:3009/test/all').get()
            //     .then(function (response) {
            //         self.questions = response;
            //     }, function (error) {
            //         console.log(error)
            //     })
        self.questions = QueryService.loadQuestions();
    });
})();
