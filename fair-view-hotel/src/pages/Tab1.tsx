import React from 'react';
import LoginPage from '../components/loginPage';
import UserPage from '../components/userPage';
import { useDispatch, useSelector } from 'react-redux';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Tab1: React.FC = () => {
  // Retrieve the loggeed in status
  const isLoggedIn = useSelector((state: any) => state.loggedIn) as boolean;
  const dispatch = useDispatch();

  const handleLoginSuccess = (customerId: string) => {
    // Dispatch login success action with customer_id payload
    dispatch({ type: 'LOGIN_SUCCESS', payload: customerId });
  };

  const handleLoginFailure = (errorMessage: string) => {
    // Dispatch login failure action with error message payload
    dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">User Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        {isLoggedIn ? (
          // Render UserPage component if isLoggedIn is true
          <UserPage /> 
        ) : (
          // Render LoginPage component if not logged in
          <LoginPage 
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
          />
        )}
        {/* Render other content of Tab1 component */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
