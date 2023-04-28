import { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './roomCard.css';
import { useSelector } from 'react-redux';

interface Room {
    room_id: string;
    room_number: number;
    room_cost: string;
    room_type: string;
    hotel_h_id: string;
    checkInDate: string;
    checkOutDate: string;
}

interface AppState {
    loggedIn: boolean;
    user: number | null;
    error: string | null;
    customer_id: number | null;
}




// Room Card That Displays Rooms Details
function RoomCard(props: Room) {
    const [isBooked, setIsBooked] = useState(false);
    const customer_id = useSelector((state: AppState) => state.customer_id);
    const loggedIn = useSelector((state: AppState) => state.loggedIn);
    // Declare all the possible type for roomType
    type RoomType =
        | 'Single Room'
        | 'Double Room'
        | 'Triple Room'
        | 'Quadruple Room'
        | 'Queen Room'
        | 'King Room'
        | 'Twin Room'
        | 'Double-double Room'
        | 'Studio Room'
        | 'Bunk Room'
        | 'Standard Room'
        | 'Deluxe Room'
        | 'Mini-Suite'
        | 'Master Suite'
        | 'Executive Suite'
        | 'Presidential Room'
        | 'Penthouse Suite'
        | 'Villa Suite'
        | 'Connecting Room'
        | 'Hollywood Twin Room';
    // Give the correct url for the room image depending on room type
    function getRoomImageUrl(roomType: RoomType): string {
        switch (roomType) {
            case 'Single Room':
                return 'https://www.paristoolkit.com/where-to-stay/images/single-rooms/single_hero.jpg';
            case 'Double Room':
                return 'https://www.hotel7dublin.com/wp-content/uploads/Hotel-7-double-bedroom.jpg';
            case 'Triple Room':
                return 'https://www.louisfitzgeraldhotel.com/wp-content/uploads/2020/03/hotel-louis-fitzgerald-082.jpg';
            case 'Quadruple Room':
                return 'https://www.belvederehoteldublin.com/wp-content/uploads/quad_room.jpg';
            case 'Queen Room':
                return 'https://cdn.traveltripper.io/site-assets/512_855_12327/media/2018-02-27-075653/large_ex-queen-king-1.jpg';
            case 'King Room':
                return 'https://www.redrockresort.com/wp-content/uploads/2020/04/RR-King-Bedroom.jpg';
            case 'Twin Room':
                return 'https://www.hotel7dublin.com/wp-content/uploads/hotel-7-twin-bedroom.jpg';
            case 'Double-double Room':
                return 'https://cdn.traveltripper.io/site-assets/512_863_12597/media/2018-02-22-041437/large_DDBDB.jpg';
            case 'Studio Room':
                return 'https://www.shenkinhotel.com/wp-content/uploads/2017/03/2628_Assaf-Pinchuk-photography.jpg';
            case 'Bunk Room':
                return 'https://media.cntraveler.com/photos/5d360919e2c2900008d6fc39/master/w_1600%2Cc_limit/San-Francisco-Proper-Hotel_Courtesy-Prosper-Hospitality_2019_SFProper_BunkRoom_111517_NoahWebb_6_web.jpg';
            case 'Standard Room':
                return 'https://www.eliaermouhotel.com/uploads/photos/D1024/2019/02/standardroom_1878.jpg';
            case 'Deluxe Room':
                return 'https://www.marinabaysands.com/content/dam/revamp/hotel/rooms-suites/deluxe-room/cityview-bedroom-1920x843.jpg';
            case 'Mini-Suite':
                return 'https://peninsula.co.za/wp-content/uploads/2014/03/Mini-Suite-4.png';
            case 'Master Suite':
                return 'https://www.rismedia.com/wp-content/uploads/2020/12/luxurious-master-bedroom-interior-picture-id1266155645-1.jpg';
            case 'Executive Suite':
                return 'https://www.legacybangkok.com/en/media/img/executive/ex-1.jpg';
            case 'Presidential Room':
                return 'https://s7d2.scene7.com/is/image/ritzcarlton/cturz-president-suite-50681272?$XlargeViewport100pct$';
            case 'Penthouse Suite':
                return 'https://d25l2iwh0hvvgd.cloudfront.net/assets/files/3116/penthouse.1800x1100.jpg';
            case 'Villa Suite':
                return 'https://theluxurytravelexpert.com/wp-content/uploads/2021/09/best-hotel-suites-villas-world.jpg';
            case 'Connecting Room':
                return 'https://www.hoteltraveltine.com/wp-content/uploads/sites/216/2021/12/Connecting-rooms.jpg';
            case 'Hollywood Twin Room':
                return 'https://www.hotelmonterey.co.jp/upload_file/monosa/stay/doanu_hollywood_twin.jpg';
            default:
                return "https://ionicframework.com/docs/img/demos/card-media.png";
        }
    }
    // Declare the room Url image variable
    const roomImageUrl = getRoomImageUrl(props.room_type as RoomType);


    const handleBookRoom = () => {
        console.log(`Room ${props.room_number} has been Attempted to book! Check In: ${props.checkInDate}, Check Out: ${props.checkOutDate}`);
        // Add the correct checkin and out times to the dates
        let checkinInFormat = props.checkInDate + ' 15:00:00';
        let checkinOutFormat = props.checkOutDate + ' 11:00:00';
        let roomId = props.room_id;
        // Send the details to the server to book the room
        fetch("http://localhost:4001/bookRoomSql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ checkinInFormat, checkinOutFormat, roomId, customer_id }),
        })
            .then((response) => {
                if (response.ok) {
                    //Change the is booked to true so the room card will update after booking
                    setIsBooked(true);
                } else {
                    console.error(`Error with booking attempt: ${response.status} - ${response.statusText}`);
                }
            })
            .catch((error) => {
                console.error("Error with booking attempt: ", error);
            });
    };


    return (
        <IonCard>
            <img alt="Room Pic" src={roomImageUrl} style={{ maxWidth: '500px' }} />

            <IonCardHeader>
                <IonCardTitle>{isBooked ? 'Room Successfully Booked!' : props.room_type}</IonCardTitle>
                <IonCardSubtitle>{`Room Number: ${props.room_number}`}</IonCardSubtitle>
            </IonCardHeader>

            {isBooked ? null : (
                <IonCardContent>
                    <p>{`Room Price: ${props.room_cost}`}</p>
                </IonCardContent>
            )}

            {loggedIn ? (
                isBooked ? null : (
                    <IonButton onClick={handleBookRoom}>
                        Book
                    </IonButton>
                )
            ) : (
                <IonCardContent style={{ color: 'red' }}>
                    <p>Login to Book</p>
                </IonCardContent>
            )}
        </IonCard>
    );
}

export default RoomCard;
