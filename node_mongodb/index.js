const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url,(err,client) => {
    assert.equal(err, null);      // checks if error is not null
    console.log('connected correctly to the server');
    const db = client.db(dbname);  // connect to database

    dboper.insertDocument(db ,{name : "Nastle" , description: "coffee"} , 'dishes' , (result) =>{
        console.log('Insert document :\n' , result.ops);

        dboper.findDocument(db , 'dishes' ,(docs) =>{
            console.log("Found Documents:\n", docs);


            dboper.updateDocument(db , {name : "Nastle" , description: "coffee"} , {name : "Nastlee" , description: "cooffee"} , 'dishes' ,(result) => {
                console.log('Updated document:\n', result.result);

                dboper.findDocument(db , 'dishes' ,(docs) =>{
                    console.log('Found Doc:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection: ',result);

                        client.close();
                    });
                });
            });
        });
    });

});
