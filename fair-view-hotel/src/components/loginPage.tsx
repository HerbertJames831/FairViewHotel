import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, setCustomerId } from '../actions.js';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface LoginPageProps {
    onLoginSuccess: (customerId: string) => void;
    onLoginFailure: (errorMessage: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    // Navigates to the signup page when button is use
    const handleSignUp = () => {
        history.push('/signup')
    }

    const handleLogin = async () => {
        // Check the email and password for a matching pair in the database
        try {
            const response = await fetch('http://localhost:4001/loginCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            // If there is a matching account
            if (response.ok) {
                // Parse response JSON
                const data = await response.json();
                if (data.success === true) {
                    // Login successful
                    console.log('Login successful');
                    // Dispatch loginSuccess action with customer_id payload
                    dispatch(loginSuccess(data.customer_id));
                    // Dispatch setCustomerId action to store customer_id in Redux store
                    dispatch(setCustomerId(data.customer_id));
                } else {
                    // Login unsuccessful
                    console.error('Login unsuccessful:', data.message);
                }
            } else {
                // Login failed
                console.error('Login unsuccessful');
            }
        } catch (error) {
            // Display Errors that may happen during request
            console.error('Error', error);
        }
    };

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
                            Fair View Hotel User Login
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput
                                    type="email"
                                    value={email}
                                    onIonChange={(e) => setEmail(e.detail.value!)}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={handleLogin}>
                                Login
                            </IonButton>

                            <p style={{ fontSize: 'medium' }}>Don't Have an Account?</p>

                            <IonButton expand="block" onClick={handleSignUp}>Sign Up</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;