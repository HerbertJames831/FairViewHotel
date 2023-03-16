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
            .then((data) => { resolve(data); console.log(data); }).catch((error) => { reject(error) })
    })
}

// Export Functions
module.exports = { getRooms, getRoomsTest2, getRoomBookedDates }
