(function () {
    'use strict';
    angular.module('legal', [
        'ngMaterial',
        'restangular',
        'ui.router',
        'angularMoment',
        'ngCookies',
        'md.data.table',
        'ngSanitize'
    ]);
angular.module('legal')
    .constant('_', window._);

angular.module('legal')
    .config(function(RestangularProvider){
        RestangularProvider
            .setBaseUrl('http://localhost:3009/api/v1');
    });

angular
    .module('legal')
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
    });



angular.module('legal')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index',{
                controller: 'MainController',
                controllerAs: 'mc',
                url:'/index',
                templateUrl:'templates/index.html'
            })
            .state('messages', {
                controller:'MessageController',
                controllerAs: 'mc',
                url:'/:id/messages',
                templateUrl: 'templates/messages.html'
            })
            .state('dialogs', {
                controller: 'MessageController',
                controllerAs: 'mc',
                url: '/:id/dialog/:dialog/messages',
                templateUrl: 'templates/dialog.html'
            })
            .state('user/questions', {
                url:'user/:id/questions',
                templateUrl: 'templates/my-questions.html'

            })
            .state('ask',{
                url:'/ask',
                template:'<create-question></create-question>'
            })
            .state('search',{
                url:'/search',
                template:'<div>Поиск</div>'
            })
            .state('library', {
                controller: 'LibraryController',
                controllerAs: 'lc',
                url: '/library',
                templateUrl: 'templates/library.html'
            })
            .state('question', {
                controller: 'QuestionController',
                controllerAs: 'qc',
                url: '/question/:id',
                templateUrl: 'templates/question.html'
            })
            .state('people', {
                controller: 'PersonController',
                controllerAs: 'pc',
                url: '/people',
                templateUrl: 'templates/people.html'
            })
            .state('person', {
                url: '/person/:id',
                template: '<person></person>'
            })
            .state('ratings', {
                url: '/ratings',
                templateUrl:'templates/ratings.html',
                controller:'MainCompCtrl',
                controllerAs: 'mc'
            })

            .state('cabinet', {
                controller: 'CabinetController',
                controllerAs: 'cc',
                url: '/cabinet',
                templateUrl: 'templates/cabinet.html'
            })
    });

angular.module('legal')
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
    });

angular.module('legal')
    .run(function(amMoment) {
        amMoment.changeLocale('ru');
    });

angular.module('legal')
    .filter('currencyRub', function ($filter) {
        return function (item) {
            return $filter('currency')(item || 0, '', 2) + ' р.';
        };
    });


angular.module('legal').filter('fpreview', function () {
   return function (input) {
       return input + ' ...';
   }
});

angular.module('legal').component('wsToolbar',{
   templateUrl:'templates/ws-toolbar.html',
    controller: 'ToolbarController'
});

angular.module('legal').component('wsMenu',{
    templateUrl:'templates/ws-menu.html',
    controller: 'ToolbarController'
});
angular.module('legal').component('listOfQuestions',{

});
angular.module('legal').component('wsQuestion',{
    // controller:'MainController',
    bindings:{
      question: '<'
    },
    templateUrl:'templates/ws-question.html'
});

    angular.module('legal').component('wsRatings',{
        controller: 'MainCompCtrl',
        templateUrl:'templates/ws-ratings.html'
    });

    angular.module('legal').component('person', {
        controller: 'PersonController',
        templateUrl:'templates/ws-person.html'
    });

angular.module('legal').component('listOfAnswers',{

});
angular.module('legal').component('answer',{

});
angular.module('legal').component('listOfDialogs',{

});
angular.module('legal').component('dialog',{

});
angular.module('legal').component('message',{

});

angular.module('legal').component('wsSideNav',{
    templateUrl:'templates/ws-sidenav.html',
    controller:'SidenavController'
});
angular.module('legal').component('wsMainComp',{
    templateUrl:'templates/ws-main.html',
    transclude:true
});
})();