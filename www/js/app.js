// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'bost.services', 'bost.controllers', 'bost.dm'])


    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider


            .state('menu', {
                url: "/event",
                abstract: true,
                templateUrl: "templates/menu/menu.html"
            })
            .state('menu.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/around.html",
                        controller: 'OffersCtrl'
                    }
                }
            })

            .state('menu.map', {
                url: "/map",
                views: {
                    'menuContent': {
                        templateUrl: "templates/map.html",
                        controller: 'MapCtrl'
                    }
                }
            })

            .state('menu.ranking', {
                url: "/ranking",
                views: {
                    'menuContent': {
                        templateUrl: "templates/ranking.html",
                        controller: 'RankingCtrl'
                    }
                }
            })

            .state('menu.messages', {
                url: "/messages",
                views: {
                    'menuContent': {
                        templateUrl: "templates/messages.html",
                        controller: 'MessagesCtrl'
                    }
                }
            })

            .state('menu.detail', {
                url: "/offer/:offerId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/offer/offer_detail.html",
                        controller: 'OfferCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/event/home');




    });


