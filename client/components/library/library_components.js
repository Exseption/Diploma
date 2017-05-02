angular.module('ws')
    .directive('library', function (LibraryService) {
        return {
            controller: function ($scope) {
                LibraryService.getBooks().then(function (data) {
                    $scope.books = data
                });
                // $scope.cat1 = {category: 'Законодательства'}
            },
            templateUrl:'../../components/library/library.html'
        }
    })
    .service('LibraryService', function (Restangular) {
        const self = this;
        self.getBooks = function () {
            return Restangular.all('library').getList();
        };
        self.getCategory = function () {
            // return Restangular.one();
        }
    })
    .directive('libCategory', function ($stateParams, LibraryService) {
        return {
            templateUrl: '../../components/library/lib-cat.html',
            link: function (scope) {
                const cat = $stateParams.cat;
            }
        }
    })
    .directive('libSearch', function () {
       return {
           templateUrl: '../../components/library/lib-search.html',
           link: function (scope) {

           }
       }
    });