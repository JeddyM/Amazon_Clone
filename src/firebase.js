import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKzhT9n2fG02XHnlP-tMlSea5YMug5vQU",
    authDomain: "clone-a09e4.firebaseapp.com",
    projectId: "clone-a09e4",
    storageBucket: "clone-a09e4.appspot.com",
    messagingSenderId: "837631367516",
    appId: "1:837631367516:web:75025c11a3322156efc999",
    measurementId: "G-N525WY5SPQ"
  };

  //initializes the Firebase application using the configuration object defined above. 


  const firebaseApp = initializeApp(firebaseConfig);

  /*Initialize the db (firestore instance to store and retrieve data)and 
  auth(manages user authentication and authorization)*/

  /*const db = firebaseApp.firestore();
  const auth = firebase.auth();*/
  
  // Initialize Firestore and Auth instances
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

//exports the db and auth instances so that they can be imported and used in other parts of the application
  export {db, auth};

  //NB:Firebase v9 and above,library moved to a modular approach, which means it no longer provides a default export
  
  