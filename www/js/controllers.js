angular.module('bost.controllers', ['ionic.service.loading'])


    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, DataManager) {
        $scope.leftButtons = [
            {
                type: 'button-icon button-clear ion-navicon',
                tap: function (e) {
                    $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
                }
            }
        ];

        $scope.toggleMenu = function () {
            //$scope.sideMenuController.toggleLeft();
            $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
        };

        $scope.leftButtons = [
            {
                type: 'button-positive',
                content: '<i class="icon ion-navicon"></i>',
                tap: function (e) {
                    $scope.toggleMenu();
                }
            }
        ];

        DataManager.load();

    })

    .controller('OffersCtrl', function ($scope, OfferService) {
        $scope.offers = OfferService.all();
        $scope.init = function () {
            $scope.toggleMenu();
        };
    })

    .controller('OfferCtrl', function ($scope, $stateParams, OfferService, BusinessService) {
        $scope.offer = OfferService.get($stateParams.offerId);
        $scope.business = BusinessService.get($scope.offer.businessId);
    })

    .controller('RankingCtrl', function ($scope, $stateParams, BusinessService) {
        $scope.businesses = BusinessService.all();
    })

    .controller('MessagesCtrl', function ($scope, $stateParams, MessageService) {
        $scope.messages = MessageService.all();
    })

    .controller('MapCtrl', function ($scope, OfferService, $ionicLoading) {
        $scope.offers = OfferService.all();

        $scope.initialize = function () {
            var mapOptions = {
                //center: new google.maps.LatLng(43.07493,-1.381388),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function (e) {
                e.preventDefault();
                return false;
            });

            $scope.map = map;
            $scope.centerOnMe();
        }
        //google.maps.event.addDomListener(window, 'load', initialize);

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        };


    })