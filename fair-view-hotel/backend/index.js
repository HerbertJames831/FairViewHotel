const app = require('express')()

const cors = require('cors');

const ejs = require('ejs')
const mysqlDB = require('./mysqlDB')
const mongoDB = require('./mongoDB')
const bodyParser = require('body-parser')


const portNum = 4001

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }), cors())


app.get('/', (req, res) => {
    console.log('Pinged')
    res.send(
        `
        <h2>Home</h2>
        <h3><a href="http://localhost:${portNum}/rooms">Rooms</a></h3>
        <h3><a href="http://localhost:${portNum}/roomsMongo">RoomsMongo</a></h3>

        `
    )

})

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

app.get('/roomsGet', (req, res) => {
    mongoDB.getRoomsMongo()
        .then((result) => {
            res.send(result)
            console.log(result)
        })
        .catch((error) => {
            res.send(error)
        })

})

var roomAvailable = function (num) {
    if (num == 0) {
        return 'Yes'
    }
    else {
        return 'No'
    }
}

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
            res.send(response);
        })
        .catch((error) => {
            res.send(error)
        })

})

app.listen(portNum, () => {
    console.log(`Example app listening on port ${portNum}`)
})