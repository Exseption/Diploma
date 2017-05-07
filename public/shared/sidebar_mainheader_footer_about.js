angular.module('ws')
    .directive('pageContainer', function () {
        return {
            transclude: true,
            template: `
            <div class="view-cntr">
            <div class="row">
            <div class="col s12">
            <div ng-transclude></div>
</div>
</div>
</div>
            `
        }
    })
    .directive('sidebar',function (SessionManager) { // sidebar
        return{
            controller: function ($scope, PeopleService) {
                PeopleService.getRatings().then(function (ratings) {
                    $scope.ratings = ratings;
                });
            }
            ,
            compile: function (elem) {
                return {
                    pre: function (scope, elem) {
                        if(!angular.isDefined(SessionManager.person)){
                            angular.element(document.querySelector('#admin')).css('display','none');
                            angular.element(document.querySelector('#user')).css('display','none');
                        } else {
                            var role = SessionManager.person.usergroup;
                            if(role === 'user'){
                                angular.element(document.querySelector('#admin')).css('display','none');
                            } else if(role === 'admin'){
                                angular.element(document.querySelector('#user')).css('display','none');
                            }
                        }
                    },
                    post: function (scope, elem) {
                    }
                }
            }
            ,
            template:`<div class="sidebar-container" id="user">
    <div class="sb-title">
        МЕНЮ ПОЛЬЗОВАТЕЛЯ
    </div>
    <div class="sb-body">
        <div class="row" style="margin-bottom: 0">
            <a class="valign-wrapper menu-btn" ui-sref="my_questions" ui-sref-active="active"><i class="material-icons i-menu">live_help</i>Мои вопросы</a>
            <a class="valign-wrapper menu-btn" ui-sref="my_messages" ui-sref-active="active"><i class="material-icons i-menu">chat_bubble_outline</i>Мои диалоги</a>
               <div ui-view="_dialogs"></div>
            <div class="divider"></div>
            <a class="valign-wrapper menu-btn" ui-sref="my_settings" ui-sref-active="active"><i class="material-icons i-menu">settings</i>Настройки</a>
        </div>
    </div>
</div>
<div class="sidebar-container" id="admin">
    <div class="sb-title">
        МЕНЮ АДМИНИСТРАТОРА
    </div>
    <div class="sb-body">
        <div class="row" style="margin-bottom: 0">
            <a class="valign-wrapper menu-btn" ui-sref="sv_users" ui-sref-active="active"><i class="material-icons i-menu">supervisor_account</i>Пользователи</a>
            <a class="valign-wrapper menu-btn" ui-sref="sv_questions" ui-sref-active="active"><i class="material-icons i-menu">chat_bubble_outline</i>Вопросы</a>
            <a class="valign-wrapper menu-btn" ui-sref="sv_answers" ui-sref-active="active"><i class="material-icons i-menu">message</i>Ответы</a>
            <a class="valign-wrapper menu-btn" ui-sref="sv_library" ui-sref-active="active"><i class="material-icons i-menu">library_books</i>Библиотека</a>
            <a class="valign-wrapper menu-btn" ui-sref="sv_pages" ui-sref-active="active"><i class="material-icons i-menu">view_headline</i>Страницы</a>
            <a class="valign-wrapper menu-btn" ui-sref="sv_dialogs" ui-sref-active="active"><i class="material-icons i-menu">speaker_notes</i>Диалоги</a>
            <div class="divider"></div>
            <a class="valign-wrapper menu-btn" ui-sref="sv_settings" ui-sref-active="active"><i class="material-icons i-menu">settings</i>Настройки</a>
        </div>
    </div>
</div>

<div class="sidebar-container">
    <!--<div class="sb-title">-->
        <!--МЕНЮ-->
    <!--</div>-->
    <div class="sb-body">
        <div class="row" style="margin-bottom: 0">
            <a class="valign-wrapper menu-btn" ui-sref-active="active" ui-sref="news"><i class="material-icons i-menu">fiber_new</i>Новости</a>
            <a class="valign-wrapper menu-btn" ui-sref-active="active" ui-sref="archive"><i class="material-icons i-menu">archive</i>Архив</a>
            <a class="valign-wrapper menu-btn" ui-sref-active="active" ui-sref="feedback"><i class="material-icons i-menu">mail</i>Обратная связь</a>
        </div>
    </div>
</div>

`
        }
    })



    .directive('mainHeader',function (SessionManager, $rootScope) {
        return {
            template: `<nav class="nav-extended mb">
    <div class="nav-wrapper dark-primary-color" style="min-height: 98px">
        <div class="container">
            <a href="#" class="brand-logo nav-btns">ВДИПЛОМЕ</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a class="nav-btns" ui-sref="search">Поиск</a></li>
                <li><a class="nav-btns" ask>Задать вопрос</a></li>
                <li><a class="nav-btns" login>Войти</a></li>
                <li><a class="nav-btns" reg>Регистрация</a></li>
                <li><a class="nav-btns" exit-button>Выход</a></li>
            </ul>       
        </div>
    </div>
    <div class="nav-content white">
       <div class="center-align page-menu">
           <a ui-sref="index" class="page-menu-link">Главная</a>
           <a ui-sref="questions" class="page-menu-link">Вопросы</a>
           <a ui-sref="people" class="page-menu-link">Участники</a>
           <a ui-sref="library" class="page-menu-link">Библиотека</a>
           <a ui-sref="about" class="page-menu-link">О нас</a>
       </div>
    </div>
</nav>`,
            compile: function (element, attr) {
                return {
                    pre: function () {
                    },
                    post: function (scope, elem) {
                        $rootScope.$on('authenticated', function (event, data) {
                            console.log(data)
                        })

                    }
                }
            }
        }
    })
    .directive('feedback' , function (Restangular) {
        return {
            template: `
            <div class="view-cntr">
            <div class="row blue-grey lighten-3" style="padding: 10px 0;">
            <div class="col s12 valign-wrapper" style="min-height: 38px;"><b>ФОРМА ОБРАТНОЙ СВЯЗИ</b></div>
            </div>
            <div class="container">
            <div class="col s12">
            <form name="FormFeedback">
                <div class="input-field">
                    <input id="_name" ng-model="_name" type="text" class="validate" required name="your_name"> 
                    <label for="_name">Ваши имя</label>
                </div>
                <div class="input-field">
                <textarea ng-model="_fb" class="materialize-textarea validate" required placeholder="Ваши отзыв, предложение, жалоба" name="your_feedback"></textarea>
                </div>
                <div class="row right-align">
                <button ng-click="send_feedback()" type="submit" class="btn waves-effect green" ng-disabled="FormFeedback.your_name.$invalid || FormFeedback.your_feedback.$invalid">Отправить</button>
            </div>
            </form>
            </div>
            </div>
            </div>
            `,
            link: function (scope, element) {
                scope.send_feedback = function () {
                    Restangular.all('feedback').post({
                        name: scope._name,
                        message: scope._fb
                    }).then(function (success) {
                        Materialize.toast('Спасибо за ваше сообщение! Ваш отзыв очень важен для нас!', 3000);
                        console.log(success);
                        scope._name = '';
                        scope._fb = '';
                        console.log(element);
                    })
                }
            }
        }
    })

    .directive('archive', function (QuestionService) {
        return {
            template: `
            <div class="view-cntr">
           <div class="row deep-purple lighten-3" style="padding: 10px 0;">
            <div class="col s12 valign-wrapper" style="min-height: 38px;"><b>АРХИВ</b></div>
            </div>
            <div class="row">
            <div class="col s12">
             <div ng-repeat="arch in archive">
             {{arch.title}}
            </div>
            </div>
            </div>
            `,
            link: function (scope, elem) {
                QuestionService.archive().then(function (results) {
                    scope.archive = results;
                })
            }
        }
    })
    .directive('footerDir', function () {
        return {
            template: `<footer class="page-footer grey darken-1">
    <div class="container">
        <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Центр правовых консультаций</h5>
                <p class="grey-text text-lighten-4">Продукт разработан в рамках дипломного проектирования.</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Ссылки</h5>
                <ul>
                    <li><a class="grey-text text-lighten-3 engine-links" href="https://nodejs.org/en/">NodeJS</a></li>
                    <li><a class="grey-text text-lighten-3 engine-links" href="https://angularjs.org/">AngularJS</a></li>
                    <li><a class="grey-text text-lighten-3 engine-links" href="http://docs.sequelizejs.com/en/v3/">Sequelize</a></li>
                    <li><a class="grey-text text-lighten-3 engine-links" href="http://materializecss.com/">Materialize</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">
            © {{year}}, Все права защищены
        </div>
    </div>
</footer>`,
            link: function (scope) {
                scope.year = new Date().getUTCFullYear();
            }
        }
    })

    .directive('about', function () {
        return {
            template: `<div class="view-cntr" style="min-height: 70vh">
    <div class="row">
        <div style="margin-bottom: 20px; padding: 10px 15px;">
            <div class="center-align"><h5 ng-bind="title"></h5></div>
            <div ng-bind="about" class="section"></div>
            <div class="divider"></div>
            <h6 style="font-weight: bolder">Наши контакты</h6>
            <div ng-bind-html="contacts"></div>
        </div>
    </div>
</div>`,
            link: function (scope) {
                scope.title = 'Добро пожаловать на веб-сервис! Здесь мы можете найти ответы на интересующие вас правовые вопросы!';
                scope.about = 'Данный проект является выпускной квалификационной работой студента Физико-математического факультета БГПУ г. Благовещенск в 2017 году Налимова Игоря.';
                scope.contacts = '<b>email</b>: brain5ur9ery@gmail.com, <b>github</b>: https://github.com/Exseption';
            }
        }
    })