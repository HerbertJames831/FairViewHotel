//VARIABLES

var booking_id = 0;
var room_id = 'R';
var customer_id = 0;
var booking_date = new Date(0);
var check_in = new Date(0);
var check_out = new Date(0);
var booking_id = 2000000;
var bookingsPerRoom = 10;
var validBookings = 0;
var populatedString = '';
var roomArray = [];

//Functions to be called
populateRoomsArray();
generateValidBookings();
logFormattedBookings();

//FUNCTIONS

//Random Number Generation within specified ranges
function RandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//Random Date Genration within specified ranges
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

//Correctly Format the date to be valid for adding to sql table
function formatDate(date) {
    let formatedDate = date.toISOString(); //Convert date to ISO string format YYYY-MM-DDThh:mm:ss.mssZ
    formatedDate = formatedDate.slice(0, 10); // Extract the first 10 characters (YYYY-MM-DD)
    return formatedDate;
}

//Correctly Format the datetime to be valid for adding to sql table
function formatDateTime(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formattedDate = date.toLocaleString('en-US', options).replace(',', '');
    return formattedDate.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
}

//Function to check if a booking date overlaps with another booking and return true or flase
function datesOverlap(checkIn1, checkOut1, checkIn2, checkOut2) {
    return (checkIn1 < checkOut2 && checkIn2 < checkOut1);
}

//Function to check each booking for a room and compare it to the specified date to see if they overlap
function checkAvailability(check_in, check_out, room) {
    for (let i = 0; i < room.bookings.length; i++) {
        const booking = room.bookings[i];
        if (datesOverlap(check_in, check_out, booking.check_in, booking.check_out)) {
            return false; // The given dates clash with a reservation
        }
    }
    return true; // The given dates do not clash with any reservation
}

//Function to return the entire booking entry correctly formatted to sql for adding to the table
function logFormattedBookings() {
    roomArray.forEach(room => {
        room.bookings.forEach(booking => {
            populatedString += '(' + booking.booking_id + ',\''
                + room.id + '\','
                + booking.customer_id + ',\''
                + formatDate(booking.booking_date) + '\',\''
                + formatDateTime(booking.check_in) + '\',\''
                + formatDateTime(booking.check_out) + '\'),\n';
        })
    })
    console.log(populatedString.slice(0, -2));
}

//Function to log check in and out dates to the console for testing
function logBookings() {
    roomArray.forEach(room => {
        room.bookings.forEach(booking => {
            console.log(room.id + ': IN: ' + booking.check_in + ' OUT: ' + booking.check_out)
        })
    })
}

//Populates the room array with rooms
function populateRoomsArray() {
    for (let i = 1; i < 21; i++) {
        if (i < 10) {
            roomId = 'R0' + i;
        }

        else {
            roomId = 'R' + i;
        }

        const room = {
            id: roomId,
            bookings: []
        }

        roomArray.push(room);
    }
    console.log(roomArray.length + 'rooms generated.');
}

//Generates and Adds Bookings to a room if they are not clashing with previous bookings
function generateValidBookings() {
    roomArray.forEach(room => {
        for (let i = 1; i < bookingsPerRoom + 1; i++) {
            customer_id = RandomNum(1, 11);
            check_in = randomDate(new Date(2023, 3, 1), new Date(2023, 3, 30));
            check_in.setHours(15, 0, 0, 0);
            check_out = new Date(check_in.getTime() + RandomNum(1, 5) * 24 * 60 * 60 * 1000);
            check_out.setHours(11, 0, 0, 0);

            if (checkAvailability(check_in, check_out, room)) {
                //console.log(room.id + ' Attempt ' + i + ' Available.');
                booking_date = new Date(check_in.getTime() - RandomNum(10, 20) * 24 * 60 * 60 * 1000);
                room.bookings.push({ customer_id: customer_id, booking_id: booking_id, booking_date: booking_date, check_in: check_in, check_out: check_out, })
                booking_id++;
                validBookings++;
            }
            else {
                //console.log(room.id + ' Attempt ' + i + ' NOT Available');
            }
        }
    });
    console.log(validBookings + ' valid Bookings Generated\n');
}

//Older generation function that is no longer needed
function olderGenerationFucntion() { 
    for (let i = 1; i < 15; i++) {
        booking_id = 2000000 + i;
        let roomNum = RandomNum(1, 21);
        if (roomNum < 10) {
            room_id += '0';
        }
        room_id += roomNum;
        customer_id = RandomNum(1, 11);
        check_in = randomDate(new Date(2023, 3, 1), new Date(2023, 3, 30));
        check_in.setHours(15, 0, 0, 0);
        check_out = new Date(check_in.getTime() + RandomNum(1, 5) * 24 * 60 * 60 * 1000);
        check_out.setHours(11, 0, 0, 0);
        booking_date = new Date(check_in.getTime() - RandomNum(10, 20) * 24 * 60 * 60 * 1000);

        populatedString += '(' + booking_id + ',\''
            + room_id + '\','
            + customer_id + ',\''
            + formatDate(booking_date) + '\',\''
            + formatDateTime(check_in) + '\',\''
            + formatDateTime(check_out) + '\'),';

        room_id = 'R';
    }
}
