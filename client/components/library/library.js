angular.module('legal').directive('library', function (LibraryService) {
    return {
        controller: function ($scope) {
                 LibraryService.getBooks().then(function (data) {
                    $scope.books = data
                });
            },
        templateUrl:'components/library/library.html'
    }
});