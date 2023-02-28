import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import React, { useState, useEffect } from 'react';

interface Room {
  roomID: number;
  roomPrice: number;
  roomDates: string[];
  roomBeds: RoomBed[];
}

interface RoomBed {
  bedType: string;
  bedSleeps: number;
}

const Tab1: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://localhost:4001/roomsGetMongo")
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error(error));
  }, []);

  function toString(dates:string[]){
    var result:string = '';

    dates.forEach(function (value) {
      result += value + ', ';
    });

    return result;
  }

  function getBedTypes(roomBeds: RoomBed[]): string {
    let bedTypes: string = '';
    roomBeds.forEach((bed: RoomBed) => {
      bedTypes += bed.bedType + ', ';
    });
    // Remove the last comma and space
    bedTypes = bedTypes.slice(0, -2);
    return bedTypes;
  }

  function getRoomOccupancy(roomBeds: RoomBed[]): number {
    let occupancy: number = 0;
    roomBeds.forEach((bed: RoomBed) => {
      occupancy += bed.bedSleeps;
    });
    return occupancy;
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Hotel Rooms Mongo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mongo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen class="ion-text-center">
          {rooms.map(room => (
            <div key={room.roomID}>
              <p>Room ID: {room.roomID}</p>
              <p>Room Price: {room.roomPrice}</p>
              <p>Room Beds: {room.roomBeds.length}</p>
              <p>Room Bed Types: {getBedTypes(room.roomBeds)}</p>
              <p>Room Max Occupancy: {getRoomOccupancy(room.roomBeds)}</p>
              <p>Booked Dates: {toString(room.roomDates)}</p>
              <br></br>
            </div>
          ))}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};



export default Tab1;