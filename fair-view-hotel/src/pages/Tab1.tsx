import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import React, { useState, useEffect } from 'react';

interface Room {
  roomID: number;
  roomPrice: number;
  roomDates: string[];
  roomBeds: {
    bedType: string;
    bedSleeps: number;
  }[];
}

const Tab1: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://localhost:4001/roomsGet")
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {rooms.map(room => (
            <div key={room.roomID}>
              <p>Room ID: {room.roomID}</p>
              <p>Room Price: {room.roomPrice}</p>
              <p>Room Beds: {room.roomBeds.length}</p>
              <p>Booked Dates: {room.roomDates.length}</p>
                
              
              <br></br>
            </div>
          ))}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;