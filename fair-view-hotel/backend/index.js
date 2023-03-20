// Import Modules
const express = require('express')
const app = express()
const cors = require('cors')
const mysqlDB = require('./mysqlDB')
const mongoDB = require('./mongoDB')
const bodyParser = require('body-parser')

// Set Up App
app.use(bodyParser.urlencoded({ extended: false }), cors())
app.use(express.json())

// Define the port number for the server
const portNum = 4001

// Home Route For Server Testing
app.get('/', (req, res) => {
    //console.log('Pinged')
    res.send(
        `
        <h2>Home</h2>
        <h3><a href="http://localhost:${portNum}/rooms">Rooms</a></h3>
        <h3><a href="http://localhost:${portNum}/roomsMongo">RoomsMongo</a></h3>
        `
    )
})

// /rooms Route that displays all rooms from TEST SQL on server side as a test
app.get('/rooms', (req, res) => {
    mysqlDB.getRooms()
        .then((result) => {
            let response = '<table><tr><th>Number</th><th>Beds</th><th>Price</th><th>Available</th></tr>';
            result.forEach(room => {
                response += '<tr><td>' + room.roomNum + '</td><td>' + room.roomBeds + '</td><td>' + room.roomPrice + '</td><td>' + roomAvailable(room.roomAvailable) + '</td></tr>'
            });
            response += '</table>'
            res.send(response);
        })
        .catch((error) => {
            res.send(error)
        })
})

// /roomsGetSQL Will return the room data from the TEST SQL online database
app.get('/roomsGetSQL', (req, res) => {
    mysqlDB.getRooms()
        .then((result) => {
            res.send(result)
            console.log(result)
        })
        .catch((error) => {
            res.send(error)
        })
})

// /roomsGetTest2 Will return all rooms from the test server that is formatted the same as Herberts database
app.get('/roomsGetTest2', (req, res) => {
    mysqlDB.getRoomsTest2()
        .then((result) => {
            res.send(result)
            console.log(result)
        })
        .catch((error) => {
            res.send(error)
        })
})

// /roomsGetMongo returns data from test Mongo Database
app.get('/roomsGetMongo', (req, res) => {
    mongoDB.getRoomsMongo()
        .then((result) => {
            res.send(result)
            console.log(result)
        })
        .catch((error) => {
            res.send(error)
        })
})

// /roomsMongo returns all Room items from Mongo Database
app.get('/roomsMongo', (req, res) => {
    mongoDB.getRoomsMongo()
        .then((result) => {
            let response = '<table><tr><th>Number</th><th>Beds</th><th>Price</th><th>Booked Dates</th></tr>';
            result.forEach(room => {
                response += '<tr><td>' + room.roomID + '</td><td>' + room.roomBeds.length + '</td><td>' + room.roomPrice + '</td><td>';
                room.roomDates.forEach(dateString => {
                    response += dateString + ", ";
                });
                response += '</td></tr>'
            });
            res.send(response)
        })
        .catch((error) => {
            res.send(error)
        })
})

// /availableRoomsSql will recieve fetch requests with check in and check out dates and return all rooms that are availble within these dates
app.post("/availableRoomsSql", (req, res) => {
    const { checkInDate, checkOutDate } = req.body;
    // Check Dates are Valid as they were undefined at a stage
    if (!checkInDate || !checkOutDate) {
        return res.status(400).send('Missing Check In or Out Date')
    }
    // Sends the dates to the getRoomBookedDates function in the mysqlDB 
    mysqlDB.getRoomBookedDates(checkInDate, checkOutDate)
        .then((result) =>{
            res.send(result)
            console.log('Search Successful.')})
        .catch((error) => {
            res.send(error)
        })
})

// /bookRoomSql recieves check in and out with the rooms Id for booking
app.post("/bookRoomSql", (req, res) => {
    const { checkinInFormat, checkinOutFormat, roomId } = req.body;

    mysqlDB.bookSelectedRoom( checkinInFormat, checkinOutFormat, roomId)
        .then(console.log('Booking Successful.'))
        .catch((error) => {
            res.send(error)
        })
})

// Have the App Listen on the defined port number
app.listen(portNum, () => {
    console.log(`Example app listening on port ${portNum}`)
})

// Quick Function To check is a room is available
var roomAvailable = function (num) {
    if (num == 0) {
        return 'Yes'
    }
    else {
        return 'No'
    }
}