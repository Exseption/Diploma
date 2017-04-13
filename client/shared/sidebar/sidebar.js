angular.module('legal').directive('sidebar',function () {
    return{
        controller: 'sidebar.ctrl',
        templateUrl:'../../shared/sidebar/sidebar.html'
    }
});