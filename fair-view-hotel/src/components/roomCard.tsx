// Imports
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './roomCard.css';

// Interface For Room
interface Room {
    room_id: string;
    room_number: number;
    room_cost: string;
    room_type: string;
    hotel_h_id: string;
    checkInDate: string;
    checkOutDate: string;
}

// Room Card That Displays Rooms Details
function RoomCard(props: Room) {
    // Function Called When the Book Button Is Pressed That calls fetch request to add the booking to the sql DB
    const handleBookRoom = () => {
        
        console.log(`Room ${props.room_number} has been booked! Check In: ${props.checkInDate}, Check Out: ${props.checkOutDate}`);
        
        let checkinInFormat = props.checkInDate + ' 15:00:00';
        let checkinOutFormat = props.checkInDate + ' 11:00:00';
        let roomId = props.room_id;

        fetch("http://localhost:4001/bookRoomSql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ checkinInFormat, checkinOutFormat, roomId}),
        })
            .then((response) => {
                // Log Response
                console.log(response);
            })
            .catch((error) => {
                console.error("Error With Booking Attempt: ", error);
            });
    };

    return (
        <IonCard>
            <img alt="Room Pic" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>{props.room_type}</IonCardTitle>
                <IonCardSubtitle>{`Room Number: ${props.room_number}`}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <p>{`Room Price: ${props.room_cost}`}</p>
                {/* <p>{`Hotel ID: ${props.hotel_h_id} (Currently Unimplemented)`}</p> */}
            </IonCardContent>

            <IonButton onClick={handleBookRoom}>
                Book
            </IonButton>
        </IonCard>
    );
}
export default RoomCard;