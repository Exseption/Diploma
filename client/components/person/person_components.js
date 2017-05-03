angular.module('ws')
    .directive('peopleList', function (PeopleService) {
        return {
            template: `<div class="row view-cntr z-depth-1">
    <div ng-repeat="p in people" class="col s6 m6">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">{{p.name}} {{p.surname}}</span>
                        <p>I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                        <a ui-sref="person({id: p.id})" style="cursor: pointer">Персональная страница</a>
                    </div>
                </div>
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
            template: `<div class="md-body-1 ws-person-card z-depth-1 view-cntr">
        <div class="md-title">
            {{person.name}} {{person.surname}} <a create-dialog><i class="material-icons you_may_click_here fix_icons_align">email</i></a>
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