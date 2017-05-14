angular.module('ws')
    .service('NewsService', function (Restangular) {
        let self = this;
        self.digestNews = function () {
            return Restangular.all('news/digest').getList();
        }
    })
    .directive('news', function (NewsService) {
        return {
            scope: {
                bc: '@'
            },
            link: function (scope) {
                NewsService.digestNews().then(function (digest) {
                    scope.digest = digest;
                })
            },
            template: `
            <div class="row {{bc}}" style="padding: 10px 0">
                        <div class="col valign-wrapper s12" style="min-height: 38px"><b>НОВОСТИ</b></div>
                        </div>
                        <div class="row">
                        <div class="col s12">
                        <div ng-repeat="new in digest">
                        <blockquote>
              <div class="valign-wrapper question_title">{{new.title}}</div>
                        <span>{{new.created | amUtc | amLocal | amDateFormat:'LLL'}}</span>
                        <p>{{new.body}}</p>           
</blockquote>                 
</div>
</div>
</div>
`
        }
    })