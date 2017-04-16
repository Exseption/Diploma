angular.module('legal').directive('ask', function (SessionManager, $rootScope, $mdDialog, QuestionService, $mdToast) {
    return {
        template: '<button class="simple-button-primary md-button md-ink-ripple" ng-click="openQuestionDialog()">Задать вопрос</button>',
        controller: function ($scope) {
            $scope.openQuestionDialog = function(ev) {
                $mdDialog.show({
                    controller: function ($scope) {
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.payable = 'free';
                        $scope.createQuestion = function (title, body, author, payable, price ) {
                            const personId = SessionManager.person.id;
                             if(payable === 'free'){
                                payable = false;
                            } else {
                             payable = true;
                            }
                            QuestionService.createQuestion(title, body, personId, payable, price).then(function (result) {
                                console.log(result);
                                $mdDialog.hide();
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('Вопрос успешно задан!')
                                        .hideDelay(5000)
                                )
                            })
                        }
                    },
                    templateUrl: '../../components/question/creating/create-question.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true
                })
            };
        },
        compile: function () {
            return {
                pre: function (scope, elem) {
                if(!angular.isDefined(SessionManager.person)){
                    elem.css('display', 'none');
                }
                },
                post: function (scope, elem) {
                    //TODO настроить появление
                    $rootScope.$on('authenticated', function (e, data) {
                        elem.css('display', 'block')
                    })

                }
            }
        }
    }
});