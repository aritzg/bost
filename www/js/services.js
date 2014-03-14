angular.module('bost.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('BusinessService', function() {

    var businesses = [
        { id: 0, name: 'Mandragora', address: 'Sert enparantza 10' },
        { id: 1, name: 'Trikuharri taberna', address: 'matia kalea 51' },
        { id: 2, name: 'Platero', address: 'matia kalea 53' }

    ];

    return {
        all: function() {
            return businesses;
        },
        get: function(businessId) {
            // Simple index lookup
            return businesses[businessId];
        }
    }
})

.factory('OfferService', function() {

  var offers = [
    { id: 0, title: 'Offer1', description: 'Good oferr', businessId : '0' },
    { id: 1, title: 'Offer2', description: 'Great discount', businessId : '1' },
    { id: 2, title: 'Offer3', description: 'mega oferta descuento 1234', businessId : '2' },
    { id: 4, title: 'Offer4', description: 'Bokadilotan deskontua. bigatik hiru', businessId : '1' }
  ];

  return {
    all: function() {
      return offers;
    },
    get: function(offerId) {
      // Simple index lookup
      return offers[offerId];
    }
  }
})

.factory('MessageService', function() {

    var offers = [
        { id: 0, title: 'Message 01', description: 'This is message 1', image : '0', imageAlign: 'left'},
        { id: 1, title: 'Message 02', description: 'This is message 1', image : '1', imageAlign: 'right'},
        { id: 2, title: 'Message 03', description: 'This is message 1', image : '2', imageAlign: 'right'},
        { id: 4, title: 'Message 04', description: 'This is message 1', image : '1',  imageAlign: 'left'}
    ];

    return {
        all: function() {
            return offers;
        },
        get: function(offerId) {
            // Simple index lookup
            return offers[offerId];
        }
    }
});



