angular.module('ws')
    .directive('library', function (LibraryService) {
        return {
            controller: function ($scope) {
                LibraryService.getBooks().then(function (data) {
                    $scope.books = data
                });
            },
            template: `<div class="view-cntr">
  <div class="section center-align">
    <a class="cat-btn"  ng-click="cat =  { category: 'Законодательства' }">Законодательства</a>
    <a class="cat-btn"  ng-click="cat = { category: 'Образцы бланков и заявлений' }">Образцы бланков и заявлений</a>
    <a class="cat-btn"  ng-click="cat = { category: 'Судебная практика' }">Судебная практика</a>
  </div>
  <lib-search></lib-search>
<div class="row" style="min-height: 70vh">
  <div class="col s12">
    <table class="highlight">
      <tbody>
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Дата загрузки</th>
      </tr>
      </thead>
      <tr ng-repeat="book in books | filter: cat | filter: lib_search">
        <td>{{$index + 1}}</td>
        <td>{{book.title}}</td>
        <td>{{book.createdAt | amUtc | amLocal | amDateFormat: 'LL'}}</td>
        <td><a ng-href="{{book.path}}">Скачать</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</div>`
        }
    })
    .service('LibraryService', function (Restangular) {
        const self = this;
        self.getBooks = function () {
            return Restangular.all('library').getList();
        };
    })
    .directive('libSearch', function () {
       return {
           template: `<div>
    <form>
        <div class="input-field col s6">
            <input type="search" ng-model="lib_search" id="lib_search">
            <label class="label-icon" for="lib_search"><i class="material-icons">search</i></label>
        </div>
    </form>
</div>`,
           link: function (scope) {

           }
       }
    });