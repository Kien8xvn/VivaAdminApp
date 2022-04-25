import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseApp = initializeApp({
    apiKey: "AIzaSyCptm0iWEnge3U1FVA4HFiH0qD4m-RtOrw",
    authDomain: "expo-cede6.firebaseapp.com",
    projectId: "expo-cede6",
    storageBucket: "expo-cede6.appspot.com",
    messagingSenderId: "194765132054",
    appId: "1:194765132054:web:c9d550f613cede6faa8037"
})
export const db2 = getFirestore();
