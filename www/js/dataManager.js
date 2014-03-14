angular.module('bost.dm', ['bost.services', 'bost.restClients'])

    .factory('DataManager', function () {

        var database_name = 'bost';
        var database_version = '1.0';
        var database_displayname = 'bost';
        var database_size = 100*1024;
        var db;
        return {
            load: function () {
                db = window.openDatabase(database_name, database_version, database_displayname, database_size);
                db.transaction(populate, errorCB, successCB);
                return;
            }
        }

        function populate(tx){
            tx.executeSql('DROP TABLE IF EXISTS DEMO');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
        };

        function errorCB () {
            alert('fuck!');
        };

        function successCB () {
            alert('yeah!!');
        };

    });



