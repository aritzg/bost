angular.module('bost.couch.business', [])


    .factory('BusinessCDBService', function () {


        var db;
        var remoteDataBase = "http://localhost:5984/" + 'business';

        return {
            initDB: function () {
                db = new PouchDB('business');
            },
            add: function (businesses, businessId, name, address) {
                var business = {
                    _id: new Date().toISOString(),
                    businessId: businessId,
                    name: name,
                    address: address,
                    completed: false
                };
                db.put(business, function callback(err, result) {
                    if (!err) {
                        console.log('Successfully posted a business!');
                    }
                });
                this.replicate();
                businesses.push(business);

            },
            get: function (businesses, id) {
                return _.findWhere(businesses, {_id: id});
            },
            getByBusinessId: function (businesses, businessId) {
                return _.findWhere(businesses, {businessId: businessId});
            },
            delete: function (businesses, id) {
                db.get(id, function (err, doc) {

                    db.remove(doc, function (err, response) {
                    });
                });
                this.replicate();
                return _.reject(businesses, function(obj){return obj._id == id; });

            },
            loadAll: function (businesses, callback) {
                db.allDocs({include_docs: true, descending: true}, function (err, doc) {
                    doc.rows.forEach(function (element) {
                        db.get(element.id, function (err, doc) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                businesses.push(doc);
                            }
                        });

                    });
                    if (callback)callback('businessLoadedFlag');
                });

            },
            replicate: function (callback) {
                var opts = {continuous: true, complete: callback};

                //PouchDB.sync(remoteDataBase);

                db.replicate.to(remoteDataBase, opts);
                db.replicate.from(remoteDataBase);
                if (callback)callback();
            },
            all: function () {
                return businesses;
            }
        }
    });



