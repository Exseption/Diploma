(function () {
    angular.module('legal').controller('sidebar.ctrl', function (RatingService) {
        var self = this;
        RatingService.getRatings().then(function (ratings) {
            self.ratings = ratings;
        });
        RatingService.getRatingAnswers().then(function (answers) {
            self.answers = answers;
        });
    });
})();