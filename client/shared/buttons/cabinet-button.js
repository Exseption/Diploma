/**
 * Created by Brainsurgery on 014 14.04.17.
 */
angular.module('legal').directive('cabinetButton', function (SessionManager) {
    return {
        template:'<button class="simple-button-primary md-button md-ink-ripple" ui-sref="cabinet">Кабинет</button>',
        controller: function ($scope) {

        },
        compile:function () {
            return {
                pre: function (scope, elem) {
                    if(!angular.isDefined(SessionManager.person)){
                        elem.css('display', 'none');
                    }
                },
                post: function (scope, elem) {
                    if(angular.isDefined(SessionManager.person)){
                        elem.css('display', 'block');
                    }
                }
            }
        }
    }
});