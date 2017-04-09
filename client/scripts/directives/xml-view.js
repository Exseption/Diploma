/**
 * Created by Brainsurgery on 008 08.04.17.
 */
(function () {
    angular.module('legal').directive('xmlView', function () {
        return {
            controller: 'QuestionController',
            controllerAs:'qc',
            link: function (scope, element, attrs) {

                element.text()
            }
        }
    })
})();