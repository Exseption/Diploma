angular.module('ws')
    .component('helpItem', {
        bindings:{
            sect: '@',
            hlp: '<'
        },
        template: `
        <h6 style="font-weight: 500; font-size: larger; text-transform: uppercase; padding-left: 5px">{{$ctrl.sect}}</h6>
        <div ng-repeat="item in $ctrl.hlp | filter: {section: $ctrl.sect}" style="margin: 5px"> 
        <div class="section blue-grey lighten-5" style="padding: 15px 10px">
        <h6 style="font-weight: 800">{{item.title}}</h6>
            <div style="padding: 10px 0">{{item.content}}</div>
            </div>
        </div>
`
    })
.directive('help', function (Restangular) {
    return {
        template: `
        <page-struct-template>
        <title-here>Справочная информация</title-here>
        <content-here>
        <help-item sect="Вопросы" hlp="help"></help-item>
        <help-item sect="Диалоги" hlp="help"></help-item>
        <help-item sect="Ответы" hlp="help"></help-item>
        <help-item sect="Поиск" hlp="help"></help-item>
        <help-item sect="Настройки" hlp="help"></help-item>
        <help-item sect="Обратная связь" hlp="help"></help-item>
        <help-item sect="Библиотека" hlp="help"></help-item>
        <help-item sect="Пользователи" hlp="help"></help-item>
</content-here>
</page-struct-template>
`,
        link: function (scope) {
            Restangular.all('help').getList().then(function (data) {
                scope.help = data;
            });
        }
    }
})