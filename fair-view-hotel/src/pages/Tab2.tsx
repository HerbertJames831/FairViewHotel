import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {

  // A few cards to act as the home page, decorative and does not contain any functionality

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Fair View Hotel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-text-center">
        <IonCard>
          <img alt="Hotel Front" src="https://galwaybayfm.ie/wp-content/uploads/2022/09/Untitled-design-94.png" style={{ maxWidth: '500px' }} />
          <IonCardHeader>
            <IonCardTitle>Welcome to the Fair View Hotel</IonCardTitle>
            <IonCardSubtitle>ATU Galways First and Best Partnered Hotel</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Located right next door to ATU Galway campus, It's perfect for all your ATU Galway hotal based needs!
          </IonCardContent>
        </IonCard>

        <IonCard>
          <img alt="Fine dining" src="https://howtostartanllc.com/images/business-ideas/business-idea-images/fine-dining.jpg" style={{ maxWidth: '500px' }} />
          <IonCardHeader>
            <IonCardTitle>Fine Dining at Fair View Restauraunt</IonCardTitle>
            <IonCardSubtitle>Experience our exquisite cuisine</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Indulge in our delicious and meticulously crafted dishes prepared by our world-renowned chefs. We offer a wide range of cuisines to cater to every taste and preference. Come and enjoy an unforgettable fine dining experience at Fair View Hotel.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <img alt="Pool and Gym Facilities" src="https://static.fivestar.ie/venues/9/3/93855/subpage/photos/1654182007-104.jpg" style={{ maxWidth: '500px' }} />
          <IonCardHeader>
            <IonCardTitle>Pool and Gym Facilities</IonCardTitle>
            <IonCardSubtitle>5 star facilities!</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Stay fit and refreshed with our state-of-the-art gym and sparkling pool. Relax and unwind after a busy day with a dip in the pool or an invigorating workout.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <img alt="Spa" src="https://www.pillohotelashbourne.com/cmsGallery/imagerow/12276/resized/1600x800/mg_0903.jpg" style={{ maxWidth: '500px' }} />
          <IonCardHeader>
            <IonCardTitle>Five Star Spa</IonCardTitle>
            <IonCardSubtitle>Relax and rejuvenate in our luxurious spa</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Indulge in our range of treatments and therapies designed to soothe your body, mind, and soul.
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
