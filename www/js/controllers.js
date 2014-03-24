angular.module('bost.controllers', ['ionic.service.loading', 'akoenig.deckgrid'])


    .controller('MainCtrl', function ($state, $scope, $ionicSideMenuDelegate, BusinessCDBService, OfferCDBService, $ionicLoading) {

        var startPage='menu.offers';
        //var startPage='menu.businesses';
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

        $scope.updateView = function(a){$scope.$apply()};

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
            //BusinessCDBService.loadAll($scope.businesses);
        };


        OfferCDBService.initDB();
        //OfferCDBService.add($scope.offers, 'Good mandra oofer', 'Bost kaña 2 ren prezioan' , 5);
        OfferCDBService.loadAll($scope.offers, endLoading,$scope.updateView );
        OfferCDBService.replicate(endReplicate);

        BusinessCDBService.initDB();
        //BusinessCDBService.add($scope.businesses, 5, 'Mandra 5', 'sert 10');
        BusinessCDBService.loadAll($scope.businesses, endLoading);





        //OfferCDBService.replicate(endReplicate);
        //BusinessCDBService.replicate(endReplicate);


    })

    .controller('OffersCtrl', function ($state, $scope, OfferCDBService) {
        /*$scope.init = function () {
            $scope.toggleMenu();
        };*/

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

        $scope.selectOffer = function(id) {
            $state.transitionTo('menu.detail', {offerId: id});
        };

        $scope.onRefresh = function() {
            OfferCDBService.replicate($scope.endRefresh);
        };

        $scope.endRefresh = function() {
            $scope.$broadcast('scroll.refreshComplete');

            OfferCDBService.loadAll($scope.offers, undefined, $scope.updateView);

        };




    })

    .controller('OfferCtrl', function ($scope, $stateParams, BusinessCDBService, OfferCDBService, $timeout, dateFilter) {
        $scope.offer = OfferCDBService.get($scope.offers, $stateParams.offerId);
        if($scope.offer){
            $scope.business = BusinessCDBService.getByBusinessId($scope.businesses, $scope.offer.businessId);
        }

        $scope.items = [{code:'code', status:'sold'},{code:'code', status:'s'},{code:'code', status:'s'},{code:'code', status:'s'},{code:'code', status:'s'},
            {code:'code', status:'s'},{code:'code', status:'s'},{code:'code', status:'s'},{code:'code', status:'s'},{code:'code', status:'s'}];

        $scope.updateTime = function(){
            $timeout(function(){
                $scope.theclock = (dateFilter(new Date(), 'hh:mm'));
                $scope.updateTime();
            },1000);
        };

        $scope.updateTime();

    })

    .controller('BusinessesCtrl', function ($state, $scope, $stateParams, BusinessCDBService) {

        //$scope.businesses = BusinessCDBService.all();
        $scope.deleteBusiness = function (id) {
            $scope.businesses = BusinessCDBService.delete($scope.businesses , id);
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

        $scope.selectBusiness = function(id) {
            $state.transitionTo('menu.detail', {offerId: id});
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
