angular.module('ws')
    .directive('peopleList', function (PeopleService) {
        return {
            template: `<div class="row view-cntr z-depth-1">
<div class="section">
<form class="container">
<div class="input-field">
<input type="search" id="people_search">
<label class="label-icon" for="people_search"><i class="material-icons">search</i> </label>
</div>
</form>
</div>

<div class="col s8">
    <div ng-repeat="p in people">
                <div class="section blue-grey lighten-5" style="padding: 10px; margin-bottom: 15px">
                    <div class="valign-wrapper">
                        <span class="question_title">{{p.name}} {{p.surname}}</span> <span ng-show="p.rating" style="margin-left: 5px" class="chip blue lighten-4">{{p.rating}}</span>
                    </div>
                    <div>
                        <a ui-sref="person({id: p.id})" style="cursor: pointer">Персональная страница</a>
                    </div>
                    <div>
                    Краткое описание
</div>
                </div>
    </div>
    </div>
<div class="col s4">
<div class="blue-grey lighten-5" style="padding: 5px">
НАСТРОЙКИ
</div>
<div style="padding: 9px">
Сортировка: <input>
</div>
<form>
<div class="input-field">

</div>
</form>
</div>
</div>
`,
            link: function (scope) {
                PeopleService.getPeople().then(function (people) {
                    scope.people = people;
                })
            }
        }
    })
    .directive('person', function (PeopleService) {
        return {
            controller: function($scope, $stateParams){
                const id = $stateParams.id;
                if(id){
                    PeopleService.getPerson(id).then(function (person) {
                        $scope.person = person;
                        $scope.show_telephone = person.settings[0].show_telephone;
                        $scope.show_email = person.settings[0].show_email;

                    });
                }
                PeopleService.getPeople().then(function (people) {
                    $scope.people = people;
                });
            },
            template: `
<div class="view-cntr">
<div class="row green lighten-1" style="padding: 10px 0;">
            <div class="col s10 valign-wrapper person_page_head" style="min-height: 38px;">
            {{person.name}} {{person.surname}} 

</div><div class="col s2 right-align">
<a class="btn-floating blue" create-dialog><i class="material-icons you_may_click_here fix_icons_align">email</i></a>
</div>
            </div>
    <div style="padding-left: 15px">
        <div>
            <b>Зарегистрирован:</b> {{person.registrated | amUtc | amLocal | amDateFormat:'LLL'}}
        </div>
        <div>
            <span><b>Дата рождения:</b></span>
            {{person.birthday | amUtc | amLocal | amDateFormat:'LL'}}
        </div>
        <div>
            <div ng-show="show_email === true"><b>E-mail:</b> {{person.email}}</div>
            <div ng-show="show_telephone === true"><b>Телефон:</b> {{person.telephone}}</div>
        </div>
        <div>
            <span class="md-body-2">Рейтинг:</span> {{person.rating}}
        </div>
    </div>

    <md-divider></md-divider>
    <div style="padding-top: 15px">
        <div class="md-subhead">Вопросы пользователя</div>
            <div ng-repeat="question in person.questions">
               <question-list-item item="question"></question-list-item>
            </div>
    </div>
    <md-divider></md-divider>
    <div style="padding-top: 15px">
        <div class="md-subhead">Ответы пользователя</div>
        <div ng-repeat="ans in person.answers">
            <answer-lite a ="ans"></answer-lite>
        </div>
    </div>
</div>`
        }
    })