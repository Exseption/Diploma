angular.module('legal').directive('dialogs', function () {
    return {
        controller: function ($scope, socket) {

            $scope.sendMessage = function (message) {
                console.log('Отправлено сообщение', message);
                socket.emit('message', { data: message })
            }
        },
        template: '<h4>Диалоги</h4>' +
        '<div><input ng-model="message"></div>' +
        '<button ng-click="sendMessage(message)">Отправить!</button> '
    }
});