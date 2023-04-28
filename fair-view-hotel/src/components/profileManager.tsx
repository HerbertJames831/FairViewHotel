import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
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

interface Customer {
    customer_id: number;
    first_name: string;
    last_name: string;
    gender: string;
    address: string;
    mobile_number: number;
    email: string;
    password: string;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ onReturn }) => {

    const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);
    const customerId = useSelector((state: AppState) => state.customer_id);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');



    useEffect(() => {
        if (customerId) {
            // Make an HTTP POST request to the server using fetch that retrieves the users current details
            fetch('http://localhost:4001/getUserDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customer_id: customerId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Unable to Retrieve User Details');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Handle successful response
                    //console.log('Customer Details Retrieved', data);
                    setCustomerDetails(data);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAddress(data.address);
                    setMobileNumber(data.mobile_number);
                    setEmail(data.email);
                    // Set other state variables for other customer details
                })
                .catch((error) => {
                    // Handle error
                    console.error(error.message);
                });
        }
    }, []); // Empty dependency array to ensure the effect runs only once

    const handleFormSubmit = (e: React.FormEvent) => {
         // Prevent default form submission behavior
         e.preventDefault();

        // Make an HTTP POST request to update customer details on the server using fetch API to send the details on the form to the server
        fetch('http://localhost:4001/updateUserDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_id: customerId,
                first_name: firstName,
                last_name: lastName,
                address: address,
                mobile_number: mobileNumber,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to Update User Details');
                }
                return response.json();
            })
            .then((data) => {
                // Handle successful response
                //console.log('Customer Details Updated', data);
                setCustomerDetails(data);
                // Update other state variables for other customer details
            })
            .catch((error) => {
                // Handle error
                console.error(error.message);
            });
    };

    return (
        <IonPage>
            <IonContent>
                {/* Render form with editable fields */}
                {customerDetails && (
                    <form onSubmit={handleFormSubmit}>
                        <IonItem></IonItem>
                        <IonItem>
                            <IonLabel position="floating">First Name</IonLabel>
                            <IonInput
                                type="text"
                                value={firstName}
                                onIonChange={(e) => setFirstName(e.detail.value!)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Last Name</IonLabel>
                            <IonInput
                                type="text"
                                value={lastName}
                                onIonChange={(e) => setLastName(e.detail.value!)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Address</IonLabel>
                            <IonInput
                                type="text"
                                value={address}
                                onIonChange={(e) => setAddress(e.detail.value!)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Mobile Number</IonLabel>
                            <IonInput
                                type="tel"
                                value={mobileNumber}
                                onIonChange={(e) => setMobileNumber(e.detail.value!)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                            />
                        </IonItem>
                        <IonButton expand="block" type="submit">Save</IonButton>
                        <IonButton expand="block" onClick={onReturn}>Return to Profile</IonButton>
                    </form>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ProfileManager