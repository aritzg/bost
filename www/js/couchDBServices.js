angular.module('bost.couch', [])

/**
 * A simple example service that returns some data.
 */

.factory('BusinessCDBService', function() {

    //var businesses = [];

    var db;
    var remoteCouch = 'http://sareweb.net:5984/business';

    return {
        start: function() {
            db = new PouchDB('business');
        },
        addBusiness: function(name, address) {
            var business = {
                _id: new Date().toISOString(),
                name: name,
                address: address,
                completed: false
            };
            db.put(business, function callback(err, result) {
                if (!err) {
                    console.log('Successfully posted a todo!');
                }
            });

        },
        delete: function(businesses, id) {
           db.get(id, function(err, doc) {
                db.remove(doc, function(err, response) { });
            });
            this.replicate();
           return _.reject(businesses, function(obj){return obj._id == id; });

        },
        loadAll : function(businesses, callback){
           db.allDocs({include_docs: true, descending: true}, function(err, doc) {
                doc.rows.forEach(function(element){
                   db.get(element.id, function(err, doc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            businesses.push(doc);
                        }
                    });

                });
               if(callback)callback();
            });

        },
        replicate : function(callback){
            //syncDom.setAttribute('data-sync-state', 'syncing');
            //var opts = {continuous: true, complete: syncError};
            db.replicate.to(remoteCouch);
            //db.replicate.from(remoteCouch);
            if(callback)callback();

        },
        all : function(){
             return businesses;
        }
    }
});



