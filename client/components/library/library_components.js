angular.module('ws')
    .directive('library', function (LibraryService) {
        return {
            controller: function ($scope) {
                LibraryService.getBooks().then(function (data) {
                    $scope.books = data
                });
            },
            templateUrl:'components/library/library.html'
        }
    })
    .service('LibraryService', function (Restangular) {
        const self = this;
        self.getBooks = function () {
            return Restangular.all('library').getList();
        }
    })