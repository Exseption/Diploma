(function () {
    angular.module('legal').controller('MainController', function (QuestionsService) {
        const self = this;
        self.data = 'data';
        self.users = QuestionsService.getAll();

    });
})();
