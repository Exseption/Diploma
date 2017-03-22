angular.module('legal').controller('CabinetController', function (QueryService, $mdDialog) {
   const self = this;
    QueryService.getQuestions().then(function (results) {
        self.questions = results;
    });
    QueryService.getUsers().then(function (results) {
        self.users = results;
    });
    QueryService.getResources().then(function (results) {
       self.resources = results;
    });

    self.cancelChanges = function () {
        $mdDialog.hide();
    };

    self.saveChanges = function () {
      // постом отправить данные полей
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