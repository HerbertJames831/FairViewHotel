//IMPORTS
const mysql = require('promise-mysql')

//Declare a var to store the created pool
var mysqlPool;

//Create Pool
mysql.createPool({
    user: 'sql8601019',
    password: 'i93XJlNwEf',
    host: 'sql8.freesqldatabase.com',
    database: 'sql8601019'
}).then(data => { mysqlPool = data }).catch((error) => { console.log(error) })

//Function to query all data from the employee table
var getRooms = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM roomsTest')
            .then((data) => { resolve(data); console.log(data) }).catch((error) => { reject(error) })
    })
}

//export functions for use outside this page
module.exports = { getRooms }
