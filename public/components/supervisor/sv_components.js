angular.module('ws')
    .directive('svUsers', function (PeopleService, $mdDialog) {
        return {
            templateUrl:'components/supervisor/users/users.html',
            link: function (scope) {
                PeopleService.getPeople().then(function (people) {
                    scope.people = people;
                });
                scope.edit_user = function (user) {
                    $mdDialog.show({
                        controller: function ($scope) {
                            $scope.user = user;
                            $scope.user.birthday = new Date($scope.user.birthday)

                        },
                        templateUrl: 'components/supervisor/users/resume.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose:true
                    });
                }
            }
        }
    })

    .directive('svQuestions', function (QuestionService) {
        return {
            templateUrl:'components/supervisor/questions/questions.html',
            link: function (scope) {
                QuestionService.getQuestions().then(function (questions) {
                    scope.questions = questions;
                });
                scope.delete_this = function (question) {
                    alert(question);
                }
            }
        }
    })