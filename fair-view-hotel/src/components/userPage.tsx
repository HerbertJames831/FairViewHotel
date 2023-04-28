import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { logout } from '../actions';
import ProfileManager from '../components/profileManager';
import UserBookings from './userBookings';

const UserPage: React.FC = () => {

    const dispatch = useDispatch();

    const [showProfileManager, setShowProfileManager] = useState(false);
    const [showUserBookings, setShowUserBookings] = useState(false);
    
    // Both components are only rendered when the status is true, when returning to this point both are close that way bot componenets can use it
    const handleReturnToProfile = () => {
        setShowProfileManager(false);
        setShowUserBookings(false);
    };

    const handleLogout = () => {
        // Dispatch the logout action to update the store state
        dispatch(logout());
    }

    const handleEditProfile = () => {
        // Toggle the showProfileManager state when "Edit Profile" button is clicked
        setShowProfileManager(!showProfileManager);
    }

    const handleManageBookings = () => {
        // Toggle the showUserBookings state when "Manage Bookings" button is clicked
        setShowUserBookings(!showUserBookings);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-text-center">User Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            Fair View Hotel User Profile
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>

                            <IonButton expand="block" onClick={handleEditProfile}>
                                Edit Profile
                            </IonButton>

                            <IonButton expand="block" onClick={handleManageBookings}>
                                Manage Bookings
                            </IonButton>
                            <IonButton expand="block" onClick={handleLogout}>
                                Log Out
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    {/* Components are only rendered when their show status is true */}
                    {showProfileManager && <ProfileManager onReturn={handleReturnToProfile} />}
                    {showUserBookings && <UserBookings onReturn={handleReturnToProfile} />}

                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default UserPage;