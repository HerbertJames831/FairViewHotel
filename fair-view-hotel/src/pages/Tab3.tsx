import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import DateRangePicker from '../components/html-datepick';

const Tab3: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Date Select</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-text-center">

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Date Select</IonTitle>
          </IonToolbar>
        </IonHeader>

        <DateRangePicker />
    
      </IonContent>
      
    </IonPage>
  );
};

export default Tab3;