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

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://localhost:4001/roomsGetSQL")
      .then(response => response.json())
      .then(data => setRooms(data))
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
          <IonTitle>Hotel Rooms SQL</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SQL</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen class="ion-text-center">
          {rooms.map(room => (
            <div key={room.roomNum}>
              <p>Room ID: {room.roomNum}</p>
              <p>Room Price: {room.roomPrice}</p>
              <p>Room Beds: {room.roomBeds}</p>
              <p>Room Availability: {checkRoomAvailable(room.roomAvailable)}</p>
              <br></br>
            </div>
          ))}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
