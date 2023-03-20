// Imports
import React, { useState } from "react";
import RoomCard from "./roomCard";

// A Search Component For Checking Rooms Available For Booking
const DateRangePicker: React.FC = () => {

  // Interface For Recieved Rooms
  interface Room {
    room_id: string;
    room_number: number;
    room_cost: string;
    room_type: string;
    hotel_h_id: string;
  }
  // Declare A Variable for storing the rooms data that can be set once the data is recieved
  const [rooms, setRooms] = useState<Room[]>([]);

  // Declare Today and Tommorows Date For the Default Check In and Check Out
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  // Declare Check In/Out and have setCheckInDate() Take First 10 Characters From the Date as A String
  var [checkInDate, setCheckInDate] = useState(today.toISOString().substr(0, 10));
  var [checkOutDate, setCheckOutDate] = useState(tomorrow.toISOString().substr(0, 10));

  // Function to Handle The Data From the Search Form Being Submitted And The Result
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    // Have The Dates Have a Default Check In/Out Time of 3pm and 11am respectivley
    checkInDate += ' 15:00:00';
    checkOutDate += ' 11:00:00';

    // Log The Dates To Console For Testing
    console.log('Check In: ' + checkInDate + ' Check Out: ' + checkOutDate);

    // Fetch a Post Request With Both Dates to availableRoomsSql
    fetch("http://localhost:4001/availableRoomsSql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkInDate, checkOutDate }),
    })
      .then((response) => {
        // Log response and then Parse The Json For Testing
        console.log(response);
        // Return Response
        return response.json();
      })
      .then((data) => {
        // Log Parsed JSON data To Conolse For Testing
        console.log(data);
        // Updates the Rooms with new Data
        setRooms(data);
      })
      .catch((error) => {
        console.error("Error With Search Request: ", error);
      });
  }

  // Main Code For the Search Bar
  return (
    <div>
      {/* A Search Bar to Choose To dates Display available rooms underneath when submitted */}
      <br/>
      <div>
        <form onSubmit={handleSearch}>

          <label htmlFor="check-in">Check In: </label>
          <input
            type="date"
            id="check-in"
            name="check-in"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />

          <label htmlFor="check-out">Check Out: </label>
          <input
            type="date"
            id="check-out"
            name="check-out"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />

          <button type="submit">Search</button>

        </form>
      </div>

      <br />

      {/* This Will Initially Have No rooms to display but once the search is submitted it will update with available rooms */}

      <div>
        {rooms.map(room => (
          <RoomCard
            key = {room.room_id}
            room_id = {room.room_id}
            room_number = {room.room_number}
            room_cost = {room.room_cost}
            room_type = {room.room_type}
            hotel_h_id = {room.hotel_h_id}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />
        ))}
      </div>

      {/* Older Way to Display the Rooms Now A Card Component is called */}
      {/* <div>
        {rooms.map(room => (
          <div key={room.room_id} className="RoomsDisplay">
            <p>Room Number: {room.room_number}</p>
            <p>Room Price: {room.room_cost}</p>
            <p>Room Type: {room.room_type}</p>
            <p>Hotel ID: {room.hotel_h_id} (Currently Unimplemented)</p>
            <br></br>
          </div>
        ))}
      </div> */}

    </div>
  );
};

// Exports
export default DateRangePicker;