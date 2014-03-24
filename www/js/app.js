// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'bost.services', 'bost.controllers', 'bost.couch.business', 'bost.couch.offer'])


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

            .state('menu.loading', {
                url: "/loading",
                views: {
                    'menuContent': {
                        templateUrl: "templates/loading.html",
                        controller: 'LoadingCtrl'
                    }
                }
            })

            .state('menu.businesses', {
                url: "/businesses",
                views: {
                    'menuContent': {
                        templateUrl: "templates/businesses.html",
                        controller: 'BusinessesCtrl'
                    }
                }
            })

            .state('menu.offers', {
                url: "/offers",
                views: {
                    'menuContent': {
                        templateUrl: "templates/offers.html",
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
            })
            .state('menu.detail_fake', {
                url: "/offer-fake",
                views: {
                    'menuContent': {
                        templateUrl: "templates/offer/offer_detail_fake.html",
                        controller: 'OfferCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.otherwise('/event/ranking');


    });


