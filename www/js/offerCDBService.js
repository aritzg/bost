angular.module('bost.couch.offer', [])


    .factory('OfferCDBService', function () {


        var db;
        var remoteCouch = 'http://192.168.0.14:5984/offer';

        return {
            initDB: function () {
                db = new PouchDB('offer');
            },
            add: function (offers, title, description, businessId) {
                var offer = {
                    _id: new Date().toISOString(),
                    title: title,
                    description: description,
                    businessId: businessId,
                    completed: false
                };
                db.put(offer, function callback(err, result) {
                    if (!err) {
                        console.log('Successfully posted a offer!');
                    }
                });
                offers.push(offer);

            },
            get: function (offers, id) {
                return _.findWhere(offers, {_id: id});
            },
            delete: function (offers, id) {
                db.get(id, function (err, doc) {

                    db.remove(doc, function (err, response) {
                    });
                });
                this.replicate();
                offers = _.reject(offers, function (obj) {
                    return obj._id == id;
                });

            },
            loadAll: function (offers, callback, updateView) {
                //offers=[];
                db.allDocs({include_docs: true, descending: false}, function (err, doc) {

                    doc.rows.forEach(function (element) {
;
                        db.get(element.id, function (err, doc) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                //offers.push(doc);
                                var index =  _.indexOf(offers,_.findWhere(offers, {_id: doc._id}));
                                if(index==-1){
                                   offers.push(doc);

                                }
                                else{
                                    offers[index]=doc;
                                }
                                updateView();
                                //alert(_.findWhere(offers, {_id: doc._id})._id);
                            }
                        });

                    });

                    if (callback)callback('offerLoadedFlag');

                });

            },
            replicate: function (callback) {
                var opts = {continuous: true, complete: callback()};
                //db.replicate.to(remoteCouch, opts);
                db.replicate.from(remoteCouch, opts);
                //db.sync(remoteCouch, opts);

            },
            all: function () {
                return offers;
            }
        }
    });



