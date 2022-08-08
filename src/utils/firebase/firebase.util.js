import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect, 
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} 
from 'firebase/auth';
import {
    getFirestore, // for getting firestore instance
    doc, // for getting document instance
    setDoc,    // C
    getDoc,    // R
    updateDoc, // U
    deleteDoc, // D
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBqsgKnrpcFBxFz_UniKrAtzoo0iZBe-LY",
    authDomain: "crwn-db-ded29.firebaseapp.com",
    projectId: "crwn-db-ded29",
    storageBucket: "crwn-db-ded29.appspot.com",
    messagingSenderId: "786174952039",
    appId: "1:786174952039:web:22ff501471c880614c0ac2",
    measurementId: "G-5TT2212D58"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createuserDocumentFromAuth = async (userAuth, additionalInformation={})=>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef)
    /*
        create a document reference regardless to the document whether it exists or not
    */
   const userSnapshot = await getDoc(userDocRef);
//    console.log(userSnapshot.exists())

   /*
        if user data exists
        if user data does not exists
            |_ create the document with the data from userAuth in users collection

        return userDocRef
   */
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        // additional information is passed here because its not gauranteed that userAuth will have all the data
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(err){
            console.log(err)
        }
    }
    return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password){
        return;
    }
    const authUser = await createUserWithEmailAndPassword(auth, email, password);
    return authUser;
}

export const LocalSignInWithEmailAndPassword = async (email, password)=>{
    if(!email || !password){
        return;
    }
    try{
        return await signInWithEmailAndPassword(auth, email, password);
    }catch(err){
        throw err;
    }
}