angular.module('legal')
.component('personComponent',{
    bindings:{
        pers:'<'
    },
    controller: function (PeopleService) {
        this.deletePerson = function (id) {
            PeopleService.deletePerson(id);
        }
    },
    template:'<div layout="row" style="padding: 5px 10px"><div flex>{{$ctrl.pers.name}}</div>' +
    '<div flex>{{$ctrl.pers.surname}} </div>' +
    '<div flex><button ng-click="null">Редактировать</button></div>' +
    '<div flex><button ng-click="$ctrl.deletePerson($ctrl.pers.id)">Удалить</button></div>' +
    '</div><div layout="column"><div flex ng-repeat="q in $ctrl.pers.questions">{{q.title}}</div> </div>'
});