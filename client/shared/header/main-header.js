angular.module('legal').directive('mainHeader',function (SessionManager) {
    return {
        templateUrl:'shared/header/main-header.html',
        controller: 'main-header.ctrl',
        compile: function (element, attr) {
            return {
                pre: function () {
                    if(SessionManager.person !== undefined){
                        // манипулируем структурой директивы на этапе конпиляции
                        angular.element(document.querySelector('.simple-button-primary')).remove();
                    }
                },
                post: function (scope, elem) {

                }
            }
        }
    }
});