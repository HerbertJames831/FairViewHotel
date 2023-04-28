import { IonPage, IonContent, IonItem, IonButton, IonHeader, IonTitle, IonToolbar, IonList, IonCol, IonGrid, IonRow} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface AppState {
    loggedIn: boolean;
    user: number | null;
    error: string | null;
    customer_id: number | null;
}

interface ProfileManagerProps {
    onReturn: () => void;
}

interface Booking {
    booking_id: number;
    room_id: string;
    customer_id: number;
    booking_date: Date;
    check_in: Date;
    check_out: Date;
}

const UserBookings: React.FC<ProfileManagerProps> = ({ onReturn }) => {

    const customer_id = useSelector((state: AppState) => state.customer_id);

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [cancelledBooking, setCancelledBooking] = useState<number | null>(null);

    useEffect(() => {
        if (customer_id || cancelledBooking) {
            // Make an HTTP POST request to the server using fetch to return all bookings with the logged in customers id
            fetch('http://localhost:4001/getUserBookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customer_id: customer_id }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Unable to Retrieve User Bookings');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Handle successful response
                    console.log('User Bookings Retrieved', data);
                    setBookings(data);
                })
                .catch((error) => {
                    // Handle error
                    console.error(error.message);
                });
        }
    }, [customer_id, cancelledBooking]);

    function cancelBooking(booking_id: number) {
        // Make an HTTP POST request to the server using fetch to cancel te specified booking
        return fetch('http://localhost:4001/cancelBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ booking_id }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to cancel booking');
                }
                return response.json();
            })
            .then((data) => {
                // Handle successful response
                console.log('Booking cancelled', data);
                setCancelledBooking(booking_id);
            })
            .catch((error) => {
                // Handle error
                console.error(error.message);
            });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-text-center">User Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonList>
                    <IonButton expand="block" onClick={onReturn}>
                        Return to Profile
                    </IonButton>
                    {/* Each Booking returned is diplayed in this format */}
                    {bookings.map((booking) => (
                        <IonItem key={booking.booking_id} class="ion-text-center">
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <p>Booking ID: {booking.booking_id}</p>
                                        <p>Booking Date: {new Date(booking.booking_date).toLocaleDateString("en-GB")}</p>
                                    </IonCol>
                                    <IonCol>
                                        <p>Check-in: {new Date(booking.check_in).toLocaleDateString("en-GB")}</p>
                                        <p>Check-out: {new Date(booking.check_out).toLocaleDateString("en-GB")}</p>
                                    </IonCol>
                                </IonRow>
                                {/* If the booking check in date is allready passed then The option to cancel the booking is no longer presented */}
                                {new Date(booking.check_in) > new Date() && (
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol size="30" >
                                            <IonButton expand="block" color="danger" onClick={() => cancelBooking(booking.booking_id)}>
                                                Cancel Booking
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                )}
                            </IonGrid>
                        </IonItem>
                    ))}

                    <IonButton expand="block" onClick={onReturn}>
                        Return to Profile
                    </IonButton>
                </IonList>
                <IonItem></IonItem>
            </IonContent>
        </IonPage>
    );
};


export default UserBookings;
