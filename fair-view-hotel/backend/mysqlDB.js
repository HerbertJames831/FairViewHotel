// IMPORTS
const mysql = require('promise-mysql')

// Declare a var to store the created pool
var mysqlPool;

// Create Pool Currently Logging into the Test SQL Host
mysql.createPool({
    user: 'admin',
    password: 'DaithiHerbert!',
    host: 'hoteldb.ct71pby1wuzq.us-east-1.rds.amazonaws.com',
    database: 'fairviewhotel'
}).then(data => { mysqlPool = data }).catch((error) => { console.log(error) })

// Function to query all data from the roomsTest table earliest test version of the table just used to check if the connection to the online db works
var getRooms = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM roomsTest')
            .then((data) => { resolve(data); /* console.log(data) */ }).catch((error) => { reject(error) })
    })
}

// Second Test Function to pull all the data from the rooms table that is formatted the same as the final database
var getRoomsTest2 = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM rooms')
            .then((data) => { resolve(data); /* console.log(data) */ }).catch((error) => { reject(error) })
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
var bookSelectedRoom = function (checkIn, checkOut, roomId, customer_id) {
    return new Promise((resolve, reject) => {
        // Get Todays Date
        const todaysDate = new Date();
        // Format Todays Date
        var bookingDate = todaysDate.toISOString().substr(0, 10);

        // Sample Booking value Layout 
        // (2000001,'R15',3,'2023-01-03','2023-01-19 15:00:00','2023-01-21 11:00:00')

        // Recieve new unique booking ID in promise form
        getNewBookingId().then((bookingId) => {
            queryString = '(' + bookingId + ',\'' + roomId + '\',\'' + customer_id + '\', \'' + bookingDate + '\',\'' + checkIn + '\',\'' + checkOut + '\')';
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
// Function to check the given emailm and password with the databse to see if it is valid and return the customer Id if it is
function loginCheck(email, password) {
    return new Promise((resolve, reject) => {
        // Check Login Details
        mysqlPool.query('SELECT customer_id FROM customers WHERE email = ? AND password = ?', [email, password], (error, results) => {
            if (error) {
                console.log('SQL Error:', error.message);
                reject(error);
            } else {
                if (results.length === 1) {
                    // Login successful, return customer ID
                    console.log(results[0].customer_id + ' Logged In')
                    resolve(results[0].customer_id);
                } else {
                    // Invalid email or password, return unsuccessful login message
                    console.log('Unsuccessful login No Matching Set');
                    // Throw an error indicating invalid email or password
                    reject(new Error('Invalid email or password'));
                }
            }
        });
    });
}
// Function to retrieve all the customer details of the given user
function getUserDetails(customer_id) {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM customers where customer_id = ?', [customer_id])
            .then((results) => { resolve(results[0]); })
            .catch((error) => { reject(error); });
    });
}

// Function to return all bookings that match a users customer Id
function getUserBookings(customer_id) {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM booking WHERE customer_id = ? ORDER BY check_in DESC', [customer_id])
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}
// Function to delete a requested booking from the table for the user
function cancelBooking(booking_id) {
    return new Promise((resolve, reject) => {
        mysqlPool.query('DELETE FROM booking WHERE booking_id = ?', [booking_id])
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}
// Function to update an existing users account details
function updateUserDetails(customer_id, first_name, last_name, address, mobile_number, email) {
    return new Promise((resolve, reject) => {
        // Update customer details in the MySQL database
        mysqlPool.query('UPDATE customers SET first_name = ?, last_name = ?, address = ?, mobile_number = ?, email = ? WHERE customer_id = ?',
            [first_name, last_name, address, mobile_number, email, customer_id], (error, results) => {
                if (error) {
                    console.log('SQL Error:', error.message);
                    reject(error);
                } else {
                    // Check if any rows were affected
                    if (results.affectedRows > 0) {
                        // Customer details updated successfully
                        console.log('Customer Details Updated');
                        resolve();
                    } else {
                        // Customer ID not found, return error message
                        console.log('Customer ID not found');
                        reject(new Error('Customer ID not found'));
                    }
                }
            });
    });
}
// Function to check what the next available possible and return it
function getNewCustomerId() {
    return new Promise((resolve, reject) => {
        // Get all existing customer IDs from the MySQL database
        mysqlPool.query('SELECT customer_id FROM customers', (error, results) => {
            if (error) {
                console.log('SQL Error:', error.message);
                reject(error);
            } else {
                // Extract the customer IDs from the results and find the next ID
                const customerIds = results.map(entry => entry.customer_id);
                const newCustomerId = Math.max(...customerIds) + 1;
                resolve(newCustomerId);
            }
        });
    });
}
// Function to create a completely new entry in the customer table
function createAccount(formData) {
    const { firstName, lastName, gender, address, mobileNumber, email, password } = formData;
    // get the next available Id
    return getNewCustomerId().then(newCustomerId => {
      return new Promise((resolve, reject) => {
        // Insert customer details into the MySQL database
        mysqlPool.query(
          'INSERT INTO customers (customer_id, first_name, last_name, gender, address, mobile_number, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [newCustomerId, firstName, lastName, gender, address, mobileNumber, email, password],
          (error, results) => {
            if (error) {
              console.log('SQL Error:', error.message);
              reject(error);
            } else {
              // Check if the customer was inserted successfully
              if (results.affectedRows > 0) {
                // Customer details inserted successfully
                console.log('Customer Details Inserted');
                resolve();
              } else {
                // Customer details not inserted, return error message
                console.log('Customer Details not Inserted');
                reject(new Error('Customer Details not Inserted'));
              }
            }
          }
        );
      });
    }).catch(error => {
      console.log(error);
      throw error;
    });
  }

// Export Functions
module.exports = { getRooms, getRoomsTest2, getRoomBookedDates, bookSelectedRoom, getBookingIds, loginCheck, getUserDetails, updateUserDetails, getUserBookings, cancelBooking,createAccount }
