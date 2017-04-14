angular.module('legal').service('LibraryService', function (Restangular) {
    const self = this;
    self.getBooks = function () {
        return Restangular.all('library').getList().then(function (books) {
            return books;
        });
    }
});