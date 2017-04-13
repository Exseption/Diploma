angular.module('legal').controller('LibraryController', function (LibraryService) {
   const self = this;
   LibraryService.getBooks().then(function (books) {
       self.books = books;
   })
});
