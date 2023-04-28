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
            //console.log(result)
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
            //console.log(result)
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
            //console.log(result)
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
        .then((result) => {
            res.send(result)
            console.log('Search Successful.')
        })
        .catch((error) => {
            res.send(error)
        })
})

// /bookRoomSql recieves check in and out with the rooms Id for booking
app.post("/bookRoomSql", (req, res) => {
    const { checkinInFormat, checkinOutFormat, roomId, customer_id } = req.body;
    mysqlDB
        .bookSelectedRoom(checkinInFormat, checkinOutFormat, roomId, customer_id)
        .then(() => {
            console.log("Booking Successful.");
            res.status(200).send("Booking successful");
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});


// /loginCheck recieves a password and email and checks if they are valid in the db
app.post("/loginCheck", (req, res) => {
    const { email, password } = req.body;
    mysqlDB.loginCheck(email, password)
        .then((result) => {
            console.log('Login Index Reached.');
            res.send({ success: true, customer_id: result });
        })
        .catch((error) => {
            console.log('Login Failed:', error.message);
            res.send({ success: false, message: error.message });
        });
});

// /getUserDetails returns the user details for a given customer id
app.post('/getUserDetails', (req, res) => {
    const { customer_id } = req.body;
    console.log(customer_id + ' requesting details');
    mysqlDB.getUserDetails(customer_id)
        .then((result) => {
            console.log('Customer Details Retrieved');
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error('Unable to Retrieve User Details', error.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
});

// /updateUserDetails updates a user details with new values
app.post('/updateUserDetails', (req, res) => {
    // Extract form data from request body
    const { customer_id, first_name, last_name, address, mobile_number, email } = req.body;

    // Call the updateUserDetails function with the extracted form data
    mysqlDB.updateUserDetails(customer_id, first_name, last_name, address, mobile_number, email)
        .then(() => {
            // Customer details updated successfully, send a response
            res.status(200).json({ success: true, message: 'Customer details updated successfully' });
        })
        .catch((error) => {
            // Error occurred during customer details update, send an error response
            console.error('Unable to update customer details', error.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
});

// /getUserBookings returns all bookings with a matching customer Id to the one given
app.post('/getUserBookings', (req, res) => {
    const { customer_id } = req.body;
    console.log(customer_id + ' requesting bookings');
    mysqlDB.getUserBookings(customer_id)
        .then((result) => {
            console.log('User Bookings Retrieved');
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error('Unable to Retrieve User Bookings', error.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
});

// /cancelBooking will delete a booking of the requested booking Id
app.post('/cancelBooking', (req, res) => {
    const { booking_id } = req.body;
    console.log('Cancelling booking with ID:', booking_id);
    mysqlDB.cancelBooking(booking_id)
        .then(() => {
            console.log('Booking cancelled');
            res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
        })
        .catch((error) => {
            console.error('Unable to cancel booking', error.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
});

// /create account adds a new customer entry to the table with the given form data
app.post('/createAccount', (req, res) => {
    const formData = req.body;

    mysqlDB.createAccount(formData)
        .then(() => {
            // Customer details inserted successfully, send a response
            res.status(200).json({ success: true, message: 'Customer details inserted successfully' });
        })
        .catch((error) => {
            // Error occurred during customer details insertion, send an error response
            console.error('Unable to insert customer details', error.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
});


// Have the App Listen on the defined port number
app.listen(portNum, () => {
    console.log(`Example app listening on port ${portNum}`)
})

// Quick Function To check is a room is available no longer used
var roomAvailable = function (num) {
    if (num == 0) {
        return 'Yes'
    }
    else {
        return 'No'
    }
}