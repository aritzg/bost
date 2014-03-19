angular.module('bost.controllers', ['ionic.service.loading'])


    .controller('MainCtrl', function ($state, $scope, $ionicSideMenuDelegate, BusinessCDBService, OfferCDBService, $ionicLoading) {

        var startPage='menu.around';
        //var startPage='menu.detail_fake';

        $scope.businesses = [];
        $scope.offers = [];

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

        $scope.loading = $ionicLoading.show({
            content: 'Bost! Kargatzen ari da!',
            showBackdrop: false
        });



        var loadedMap = {offerLoadedFlag : false , businessLoadedFlag : false};

        endLoading = function (flag) {
            loadedMap[flag]=true;
            if(allLoaded()){
                $state.transitionTo(startPage);
                $scope.loading.hide();
            }
        };

        allLoaded = function () {
            return _.reduce(loadedMap, function(memo, num){return memo && num; }, true);
        };


        endReplicate = function () {
            BusinessCDBService.loadAll($scope.businesses);
            alert($scope.businesses.length);
        };


        OfferCDBService.initDB();
        //OfferCDBService.add($scope.offers, 'Good mandra oofer', 'Bost kaña 2 ren prezioan' , 5);
        OfferCDBService.loadAll($scope.offers, endLoading);

        BusinessCDBService.initDB();
        //BusinessCDBService.add($scope.businesses, 5, 'Mandra 5', 'sert 10');
        BusinessCDBService.loadAll($scope.businesses, endLoading);

        OfferCDBService.replicate();
        BusinessCDBService.replicate(endReplicate);



    })

    .controller('OffersCtrl', function ($state, $scope, OfferCDBService) {
        $scope.init = function () {
            $scope.toggleMenu();
        };

        $scope.itemButtons = [
            {
                text: 'Delete',
                type: 'button-assertive',
                onTap: function(offer) {
                    alert(offer.title);
                }
            },
            {
                text: 'Share',
                type: 'button-calm',
                onTap: function(offer) {
                    alert(offer.title);
                }
            }
        ];

        $scope.selectProject = function(id) {
            $state.transitionTo('menu.detail', {offerId: id});
        };

    })

    .controller('OfferCtrl', function ($scope, $stateParams, BusinessCDBService, OfferCDBService, $timeout, dateFilter) {
        $scope.offer = OfferCDBService.get($scope.offers, $stateParams.offerId);
        if($scope.offer){
            $scope.business = BusinessCDBService.getByBusinessId($scope.businesses, $scope.offer.businessId);
        }

        $scope.updateTime = function(){
            $timeout(function(){
                $scope.theclock = (dateFilter(new Date(), 'hh:mm:ss'));
                $scope.updateTime();
            },1000);
        };

        $scope.updateTime();

    })

    .controller('RankingCtrl', function ($scope, $stateParams, BusinessCDBService) {

        //$scope.businesses = BusinessCDBService.all();
        $scope.deleteBusiness = function (id) {
            $scope.businesses = BusinessCDBService.delete($scope.businesses , id);
        };
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


    });

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});
