angular.module('legal').controller('CabinetController', function (PeopleService, $mdDialog, SessionManager, QuestionService) {
   const self = this;
    QuestionService.getQuestions().then(function (results) {
        self.questions = results;
    });
    PeopleService.getPeople().then(function (results) {
        self.users = results;
    });

    self.deleteQuestion = function(q) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Вы действительно хотите удалить вопрос?')
                .textContent('Вопрос будет удален безвозвратно!')
                .ariaLabel('Удаление вопроса')
                // .targetEvent(ev)
                .ok('Подтвердить!')
                .cancel('Отмена');

            $mdDialog.show(confirm).then(function() {
                QuestionService.deleteQuestion(q.id).then(function (result) {
                    _.pull(self.questions, q);
                });
            }, function() {
            });
        };

    self.cancelChanges = function () {
        $mdDialog.hide();
    };

    self.saveChanges = function (birthday) {
        alert(birthday);
    };


    self.auth = function (login, password) {
        SessionManager.auth(login, password);
        $mdDialog.hide();
    };

    self.regUser = function (name) {
        alert(name)
    };

    self.editUser = function (user) {
        $mdDialog.show({
            controller: function(){
                self.user = user;
                self.user.birthday = new Date(self.user.birthday);
                self.user.date_of_registration = new Date(self.user.date_of_registration);
                return self;
            },
            controllerAs: 'cc',
            templateUrl: '../../templates/edit-user-part.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        })
            .then(function() {
                },
                function() {
                });
    };
});
