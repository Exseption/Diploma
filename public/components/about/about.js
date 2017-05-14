angular.module('ws')
    .directive('about', function (Restangular) {
        return {
            template: `<div class="view-cntr" style="min-height: 70vh">
    <div class="row">
        <div style="margin-bottom: 20px; padding: 10px 15px;">
            <div class="center-align"><h5 ng-bind="title"></h5></div>
            <div ng-bind="about" class="section"></div>
            <div class="divider"></div>
            <h6 style="font-weight: bolder">Наши контакты</h6>
            <div ng-bind-html="contacts"></div>
        </div>
    </div>
</div>`,
            link: function (scope) {
                // Restangular.all('about').get().then(function (data) {
                //     scope.data = data;
                // });
                scope.title = 'Добро пожаловать на веб-сервис! Здесь мы можете найти ответы на интересующие вас правовые вопросы!';
                scope.about = 'Данный проект является выпускной квалификационной работой студента Физико-математического факультета БГПУ г. Благовещенск в 2017 году Налимова Игоря.';
                scope.contacts = 'brain5ur9ery@gmail.com';
            }
        }
    })