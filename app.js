(function () {
    'use strict';
    var app = angular.module('myApp',[
        'ui.router',
        'center',
    ]);
    app.config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
        .state('login',{
            url:'/login',
            templateUrl:'../components/center/templates/login.html'
        })
        .state('register',{
            url:'/register',
            templateUrl:'../components/center/templates/register.html'
        })
        .state('findPassword',{
            url:'/findPassword',
            templateUrl:'../components/center/templates/findPassword.html'
        });
        //重定向
        $urlRouterProvider.otherwise('/login');
    });
})();