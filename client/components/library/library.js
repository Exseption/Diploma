angular.module('legal').directive('library', function (LibraryService) {
    return {
        controller: function ($scope) {
                $scope.books = LibraryService.getBooks();
            },
        templateUrl:'components/library/library.html'
    }
});