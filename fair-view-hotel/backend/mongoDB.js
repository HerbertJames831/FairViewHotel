//Main code for accessing the mongoDB database

//IMPORTS
var MongoClient = require('mongodb').MongoClient;

//Declare Variable
var database;
var collection;

//Connect to mongo and recieve the db and collection
MongoClient.connect('mongodb+srv://admin:admin@cluster0.s9dxiuk.mongodb.net/?retryWrites=true&w=majority')
    .then((client) => {
        database = client.db('FairViewHotel')
        collection = database.collection('Rooms')
    })
    .catch((error) => {
        console.log(error.message)
    })

function getRoomsMongo() {
    return new Promise((resolve, reject) => {
        data = collection.find()
        data.toArray()
            .then((data) => {
                console.log(data)
                resolve(data)
                
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getRoomsMongo }