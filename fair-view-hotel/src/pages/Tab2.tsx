import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import React, { useState, useEffect } from 'react';

const Tab2: React.FC = () => {

  interface Room {
    roomNum: number;
    roomBeds: number;
    roomPrice: number;
    roomAvailable: number;
  }

  interface RoomTest2 {
    room_id: string;
    room_number: number;
    room_cost: string;
    room_type: string;
    hotel_h_id: string;
  }

  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomsTest2, setRooms2] = useState<RoomTest2[]>([]);

  useEffect(() => {
    fetch("http://localhost:4001/roomsGetSQL")
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4001/roomsGetTest2")
      .then(response => response.json())
      .then(data => setRooms2(data))
      .catch(error => console.error(error));
  }, []);

  function checkRoomAvailable(available:number): string{
    
    var result:string = '';

    if(available == 0){
      result = 'Is Available';
    }
    else{
      result = 'Is Not Available';
    }

    return result;

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Hotel Rooms SQL</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SQL</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonContent fullscreen class="ion-text-center">
          {rooms.map(room => (
            <div key={room.roomNum}>
              <p>Room ID: {room.roomNum}</p>
              <p>Room Price: {room.roomPrice}</p>
              <p>Room Beds: {room.roomBeds}</p>
              <p>Room Availability: {checkRoomAvailable(room.roomAvailable)}</p>
              <br></br>
            </div>
          ))}
        </IonContent> */}
        <IonContent fullscreen class="ion-text-center">
          {roomsTest2.map(room => (
            <div key={room.room_id}>
              <p>Room Number: {room.room_number}</p>
              <p>Room Price: {room.room_cost}</p>
              <p>Room Type: {room.room_type}</p>
              <p>Hotel ID: {room.hotel_h_id} (Currently Unimplemented)</p>
              <br></br>
            </div>
          ))}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
