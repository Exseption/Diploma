angular.module('ws')
    .directive('archive', function (QuestionService) {
        return {
            template: `
            <div class="view-cntr">
           <div class="row blue lighten-4" style="padding: 10px 0;">
            <div class="col s12 valign-wrapper" style="min-height: 38px;"><b>АРХИВ</b></div>
            </div>
            <div class="row">
            <div class="col s12">
             <div ng-repeat="arch in archive">
             {{arch.title}}
            </div>
            </div>
            </div>
            `,
            link: function (scope, elem) {
                QuestionService.archive().then(function (results) {
                    scope.archive = results;
                })
            }
        }
    })