import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import DateRangePicker from '../components/html-datepick';

const Tab3: React.FC = () => {
  //Page For the Searching for bookings
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Booking</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-text-center">

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Date Select</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Import the Date Range Picker */}
        <DateRangePicker />
    
      </IonContent>
      
    </IonPage>
  );
};

export default Tab3;