import firebase from 'firebase/app';
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBabXHAtG0l-HOs80E20C38fx31nT5C1i4",
    authDomain: "eroneko.firebaseapp.com",
    projectId: "eroneko",
    storageBucket: "eroneko.appspot.com",
    messagingSenderId: "636848523194",
    appId: "1:636848523194:web:fc3caa2183a96dffc83f83",
    measurementId: "G-VCW28C014K"
});

export const auth = app.auth();
export default app;