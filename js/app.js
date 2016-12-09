var game = angular.module('myGame', ['ui.router', 'GameController', 'GameFactories', 'RandomObjectFactory']);

game.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                'content': {
                    templateUrl: 'html/home.html',
                    controller: 'GameController'
                }
            }
        })
});
