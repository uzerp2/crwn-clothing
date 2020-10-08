import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD5hEOXUvhC9rmX4Kw_vPJ4kcoHR8NbqRE",
  authDomain: "crwn-db-29f92.firebaseapp.com",
  databaseURL: "https://crwn-db-29f92.firebaseio.com",
  projectId: "crwn-db-29f92",
  storageBucket: "crwn-db-29f92.appspot.com",
  messagingSenderId: "803952492292",
  appId: "1:803952492292:web:facf2e4029c746e21b5a51"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;