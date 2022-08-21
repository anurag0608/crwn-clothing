import {initializeApp} from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged, // auth object change listner
    signInWithRedirect, 
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
} 
from 'firebase/auth';
import {
    getFirestore, // for getting firestore instance
    doc, // for getting document instance
    query,
    where,
    setDoc,    // C
    getDoc,    // R
    getDocs,
    updateDoc, // U
    deleteDoc, // D
    collection, // for getting collection instance
    writeBatch, // for batch write
    serverTimestamp, // for getting server timestamp
} from 'firebase/firestore'
// const firebaseConfig = {
//     apiKey: "AIzaSyBqsgKnrpcFBxFz_UniKrAtzoo0iZBe-LY",
//     authDomain: "crwn-db-ded29.firebaseapp.com",
//     projectId: "crwn-db-ded29",
//     storageBucket: "crwn-db-ded29.appspot.com",
//     messagingSenderId: "786174952039",
//     appId: "1:786174952039:web:22ff501471c880614c0ac2",
//     measurementId: "G-5TT2212D58"
//   };
  const firebaseConfig = {
    apiKey: "AIzaSyBXD2amthMzpk4NQ-Ka9EgGllDTTzPnvWU",
    authDomain: "crwn-clothing-b4587.firebaseapp.com",
    projectId: "crwn-clothing-b4587",
    storageBucket: "crwn-clothing-b4587.appspot.com",
    messagingSenderId: "470283358488",
    appId: "1:470283358488:web:3c40b1d01a20c21fdf4e6d",
    measurementId: "G-Q5KGRHC859"
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

export const SignOutUser = async()=>{
    try{
        return await signOut(auth)
    }catch(error){
        throw error;
    }
}
export const onAuthChangeListner = async(callback)=>{
    onAuthStateChanged(auth, callback);
}
// https://firebase.google.com/docs/firestore/manage-data/transactions?authuser=0#batched-writes
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(obj=>{
        const newDocRef = doc(collectionRef);
        batch.set(newDocRef, {
            createdAt: serverTimestamp(),
            ...obj
        });
    })
    return await batch.commit();
}
export const getCollectionAndDocuments = async (collectionKey,id=null)=>{
    const collectionRef = collection(db, collectionKey);
    if(id){
        const collectionSnapshot = await getDoc(doc(collectionRef, id));
        return collectionSnapshot.data();
    }
    // build a query
    const q = query(collectionRef);
    const collectionSnapshot = await getDocs(q);
    const collectionData = collectionSnapshot.docs.map(doc=>{
        return {
            id: doc.id, // this is the document id, not the collection id
            ...doc.data()
        }
    });
    return collectionData;
}
export const updateCollectionAndDocuments = async (collectionKey, id, data)=>{
    const collectionRef = collection(db, collectionKey);
    const docRef = doc(collectionRef, id);
    return await updateDoc(docRef, data);
}
/**
 * General firestore procedure for CRUD
 * 1. Create a collection reference
 * 2. CRUD
 *    C -> setDocs(collectionRef)
 *      -> And for creating in bulk use batch using write batch
 *    R -> create a query(collectionRef) 
 *      -> getDocs(query) the map over it. To get the doc data use doc.data()
 */