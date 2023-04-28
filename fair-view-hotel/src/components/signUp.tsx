import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const SignUp: React.FC = () => {
    // Page for the user to submit there details and creat an account

    // To return to login page
    const history = useHistory();

    // All logic needed for email variable, checks email is the valid format for submission
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const validateEmail = (value: string) => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isValid = emailRegex.test(value);
        setIsEmailValid(isValid);
        return isValid;
    };
    const handleEmailChange = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        if (validateEmail(value)) {
            setEmail(value);
        }
    };
    // All logic needed for password variable, checks email is the valid format for submission
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const validatePassword = (value: string) => {
        const isValid = value.length >= 6;
        setIsPasswordValid(isValid);
        return isValid;
    };
    const handlePasswordChange = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        if (validatePassword(value)) {
            setPassword(value);
        }
    };
    // All logic needed for email firstName, checks firstName is the valid format for submission
    const [firstName, setFirstName] = useState('');
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const validateFirstName = (value: string) => {
        const isValid = value.length <= 50;
        setIsFirstNameValid(isValid);
        return isValid;
    };
    const handleFirstNameChange = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        if (validateFirstName(value)) {
            setFirstName(value);
        }
    };
    // All logic needed for lastname variable, checks lastname is the valid format for submission
    const [lastName, setLastName] = useState('');
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const validateLastName = (value: string) => {
        const isValid = value.length <= 50;
        setIsLastNameValid(isValid);
        return isValid;
    };
    const handleLastNameChange = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        if (validateLastName(value)) {
            setLastName(value);
        }
    };
    // All logic needed for gender variable, checks that it is the valid format for submission
    const [gender, setGender] = useState('');
    const [isGenderValid, setIsGenderValid] = useState(true);
    const validateGender = (value: string) => {
        const isValid = value.length <= 50;
        setIsGenderValid(isValid);
        return isValid;
    };
    const handleGenderChange = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        if (validateGender(value)) {
            setGender(value);
        }
    };
    // All logic needed for address variable, checks that it is the valid format for submission
    const [address, setAddress] = useState('');
    const [isAddressValid, setIsAddressValid] = useState(true);
    const validateAddress = (value: string) => {
        const isValid = value.length <= 80;
        setIsAddressValid(isValid);
        return isValid;
    };
    const handleAddressChange = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        if (validateAddress(value)) {
            setAddress(value);
        }
    };
    // All logic needed for mobileNumber variable, checks that it is the valid format for submission
    const [mobileNumber, setMobileNumber] = useState('');
    const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
    const validateMobileNumber = (value: string) => {
        const isValid = /^\d+$/.test(value);
        setIsMobileNumberValid(isValid);
        return isValid;
    };
    const handleMobileNumberChange = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        if (validateMobileNumber(value)) {
            setMobileNumber(value);
        }
    };
    // Confirms all entrys are valid for the submission
    const isFormValid = () => {
        return isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid && isGenderValid && isAddressValid && isMobileNumberValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        // create form data object
        const formData = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            address: address,
            mobileNumber: mobileNumber,
            email: email,
            password: password,
        };

        // send form data as JSON to server
        fetch("http://localhost:4001/createAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to create account");
                }
                return response.json();
            })
            .then((data) => {
                // Display success message and remove the form from view
                const message = document.createElement("div");
                message.innerText = "Account Created Successfully!";
                message.style.fontSize = "20px";
                message.style.fontWeight = "bold";
                message.style.textAlign = "center";

                const content = document.getElementById("signup-content");
                if (content) {
                    content.innerHTML = "";
                    content.appendChild(message);
                }
                // After 3 seconds return to the login page
                setTimeout(() => {
                    history.push("/tab1");
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-text-center">Sign Up Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="signup-content">
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="floating" color={isFirstNameValid ? undefined : "danger"}>
                            {isFirstNameValid ? "First Name" : "First Name must be less than 50 characters"}
                        </IonLabel>
                        <IonInput
                            type="text"
                            value={firstName}
                            onIonChange={handleFirstNameChange}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating" color={isLastNameValid ? undefined : "danger"}>
                            {isLastNameValid ? "Last Name" : "Last Name must be less than 50 characters"}
                        </IonLabel>
                        <IonInput
                            type="text"
                            value={lastName}
                            onIonChange={handleLastNameChange}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating" color={isGenderValid ? undefined : "danger"}>
                            {isGenderValid ? "Gender" : "Gender must be less than 50 characters"}
                        </IonLabel>
                        <IonInput
                            type="text"
                            value={gender}
                            onIonChange={handleGenderChange}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating" color={isAddressValid ? undefined : "danger"}>
                            {isAddressValid ? "Address" : "Address must be less than 80 characters"}
                        </IonLabel>
                        <IonInput
                            type="text"
                            value={address}
                            onIonChange={handleAddressChange}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating" color={isMobileNumberValid ? undefined : "danger"}>
                            {isMobileNumberValid ? "Mobile Number" : "Mobile Number must be a number"}
                        </IonLabel>
                        <IonInput
                            type="tel"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            value={mobileNumber}
                            onIonChange={handleMobileNumberChange}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating" color={isEmailValid ? undefined : "danger"}>
                            {isEmailValid ? "Email" : "Invalid Email"}
                        </IonLabel>
                        <IonInput
                            type="email"
                            value={email}
                            onIonChange={handleEmailChange}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating" color={isPasswordValid ? undefined : "danger"}>
                            {isPasswordValid ? "Password" : "Password must be at least 6 characters"}
                        </IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={handlePasswordChange}
                        ></IonInput>
                    </IonItem>
                    <IonLabel></IonLabel>
                    <IonButton expand="block" disabled={!isFormValid()} type="submit">Submit</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
