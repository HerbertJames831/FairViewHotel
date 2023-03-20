// IMPORTS
const mysql = require('promise-mysql')

// Declare a var to store the created pool
var mysqlPool;

// Create Pool Currently Logging into the Test SQL Host
mysql.createPool({
    user: 'sql8601019',
    password: 'i93XJlNwEf',
    host: 'sql8.freesqldatabase.com',
    database: 'sql8601019'
}).then(data => { mysqlPool = data }).catch((error) => { console.log(error) })

// Function to query all data from the roomsTest table earliest test version of the table just used to check if the connection to the online db works
var getRooms = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM roomsTest')
            .then((data) => { resolve(data); console.log(data) }).catch((error) => { reject(error) })
    })
}

// Second Test Function to pull all the data from the rooms table that is formatted the same as the final database
var getRoomsTest2 = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM rooms')
            .then((data) => { resolve(data); console.log(data) }).catch((error) => { reject(error) })
    })
}

// Querys The DB for all Rooms that are Available to be Booked Within the Given Range and Returns Them
var getRoomBookedDates = function (checkIn, checkOut) {
    return new Promise((resolve, reject) => {
        mysqlPool.query(
            'SELECT * ' +
            'FROM rooms ' +
            'WHERE room_id NOT IN( ' +
            'SELECT DISTINCT room_id ' +
            'FROM booking ' +
            'WHERE (check_in < ? AND check_out > ? ) ' +
            'OR (check_in >= ? AND check_out <= ? ) ' +
            'OR (check_in < ? AND check_out > ? ) ' +
            ');',
            [checkOut, checkIn, checkIn, checkOut, checkIn, checkOut]
        )
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}

// Adds a booking Value to The Booking SQL table
var bookSelectedRoom = function (checkIn, checkOut, roomId) {
    return new Promise((resolve, reject) => {
        // Get Todays Date
        const todaysDate = new Date();
        // Format Todays Date
        var bookingDate = todaysDate.toISOString().substr(0, 10);

        // Sample Booking value Layout 
        // (2000001,'R15',3,'2023-01-03','2023-01-19 15:00:00','2023-01-21 11:00:00')

        // Recieve new unique booking ID in promise form
        getNewBookingId().then((bookingId) => {
            queryString = '(' + bookingId + ',\'' + roomId + '\',1, \'' + bookingDate + '\',\'' + checkIn + '\',\'' + checkOut + '\')';
            console.log(queryString);

            // Log The Query to console for testing
            console.log('INSERT INTO `booking` VALUES ' + queryString + ';\n');

            // Execute the SQL query
            mysqlPool.query('INSERT INTO `booking` VALUES ' + queryString + ';\n')
                .then((data) => { console.log(data); resolve(data); })
                .catch((error) => { console.log('SQL Error:', error.message); reject(error); })
        }).catch((error) => {
            console.log('Error getting new booking ID:', error);
            reject(error);
        });
    })
}

// Query all booking_id values from the booking table
var getBookingIds = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT booking_id from booking order by booking_id;')
            .then((data) => { resolve(data) })
            .catch((error) => { console.log('SQL Error:', error.message); reject(error); })
    })
}

// Generate a new unique booking Id and return ain promnise form
function getNewBookingId() {
    return getBookingIds().then(function (data) {
        // For each booking Id in the reult add each id to a bookinIds array
        var bookingIds = data.map(function (entry) { return entry.booking_id; });
        // Find the highest value booking number and add a 1 to it to ensure it is unique
        var newBookingId = Math.max.apply(null, bookingIds) + 1;
        return newBookingId;
    }).catch(function (error) {
        console.log(error);
        throw error;
    });
}

// Export Functions
module.exports = { getRooms, getRoomsTest2, getRoomBookedDates, bookSelectedRoom, getBookingIds }
