angular.module('ws')
    .service('PeopleService', function (Restangular) {
        const self = this;
        self.deletePerson = function (id) {
            return Restangular.one('delete/person',id).remove();
        };
        self.getRatings = function () {
            return Restangular.one('ratings','people').getList();
        };
        self.getPerson = function (id) {
            return Restangular.one('person', id).get();
        };
        self.getPeople = function () {
            return Restangular.all('people').getList();
        };
        self.registerPerson = function (login, password, name, surname, email, birthday, country, area, city, telephone) {
            return Restangular.all('create/person').post({
                login: login,
                password: password,
                name: name,
                surname: surname,
                email: email,
                birthday: birthday,
                country: country,
                area: area,
                city: city,
                telephone: telephone
            })
        }
    })
    .directive('peopleList', function (PeopleService) {
        return {
            template: `<div class="view-cntr">
<div class="row blue lighten-4" style="padding: 10px 0;">
            <div class="col s10 valign-wrapper question_title" style="min-height: 38px;">
             УЧАСТНИКИ ВЕБ-СЕРВИСА
            </div>
            <div class="col s2 right-align">
</div>      
</div>
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
                        <span class="question_title">{{p.name}} {{p.surname}}</span> 
                    </div>
                    <div>
                        <a ng-show="p.rating" style="margin-left: 5px">Рейтинг: {{p.rating}}</a>
                        <a ui-sref="person({id: p.id})" class="you_may_click_here person_page_icon" ><i class="material-icons fix_icons_align">person</i></a>
                        <a class="you_may_click_here person_page_icon" create-dialog><i class="material-icons fix_icons_align">email</i></a>
                    </div>
                    <div>
                    </div>
                </div>
    </div>
    </div>
<div class="col s4">
<div class="blue-grey lighten-5" style="padding: 5px">НАСТРОЙКИ</div>
<div style="padding: 9px">
<form>
<div class="col s12">Рейтинг<div class="divider"></div></div>
<div class="col s4">Сортировка: </div>
    <div class="col s8">
        <div>
            <input name="g1" type="radio" id="_desc">
            <label for="_desc">по возрастанию</label>
        </div>
    <div>
        <input name="g1" type="radio" id="_asc">
        <label for="_asc">по убыванию</label>
    </div>
    </div>
<div style="margin-top: 25px;" class="col s12">География<div class="divider"></div></div>
<div class="col s12">
<div class="input-field">
<input type="text" id="country">
<label for="country">Страна</label>
</div>
<div class="input-field">
<input type="text" id="area">
<label for="area">Область, край</label>
</div>
<div class="input-field">
<input type="text" id="city">
<label for="area">Город</label>
</div>
</div>
<div class="right-align">
<a class="btn blue-grey lighten-2">Применить</a>
</div>
</form>
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
            <span><b>Рейтинг:</b></span> {{person.rating}}
        </div>
    </div>

    <md-divider></md-divider>
    <div style="padding-top: 15px">
        <div style="text-transform: uppercase; font-weight: bold">Вопросы пользователя</div>
            <div ng-repeat="question in person.questions">
               <div class="blue-grey lighten-5 lite-ans-quest" ui-sref="question({id: question.id})">
               {{question.title}}
</div>
            </div>
    </div>
    <md-divider></md-divider>
    <div style="padding-top: 15px">
        <div style="text-transform: uppercase; font-weight: bold">Ответы пользователя</div>
        <div ng-repeat="ans in person.answers">
            <div  class="blue-grey lighten-5 lite-ans-quest">
            {{ans.body}}
            <div>{{ans.question}}</div>
            <div class="right-align" style="font-weight: bolder">Оценка: {{ans.mark}}</div>
            </div>
        </div>
    </div>
</div>`
}
})