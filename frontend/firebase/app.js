// In your index.js or App.js file
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCE56CdPzPDv-3O31JSIb3C3ElQjWLJfEM",
    authDomain: "twitterclone-d45ec.firebaseapp.com",
    databaseURL: "https://twitterclone-d45ec-default-rtdb.firebaseio.com",
    projectId: "twitterclone-d45ec",
    storageBucket: "twitterclone-d45ec.appspot.com",
    messagingSenderId: "498609272951",
    appId: "1:498609272951:web:7eee69b38207180d4f6e72"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;