angular.module('legal').directive('dialogs', function (DialogService, SessionManager) {
    return {
        controller: function ($scope) {
            const id = SessionManager.person.id;
            console.log(id)
            if(id){
                DialogService.getDialogs(id).then(function (data) {
                    $scope.dialogs = data;
                })
            }

        },

        templateUrl: '../../components/dialog/messages.html'
    }
});