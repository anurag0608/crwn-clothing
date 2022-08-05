import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
    auth, // for redirect login
    signInWithGooglePopup, 
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.util';
import { createuserDocumentFromAuth } from '../../utils/firebase/firebase.util';
import SignUpForm from '../../components/sign-up-form/sign-up.form.component';
const SignIn = ()=>{
    /*
        uncomment it if u want to use login with redirect
        useEffect(()=>{
            (async function(){
                const response = await getRedirectResult(auth);
                if(response){
                    const userDocRef = await createuserDocumentFromAuth(response.user);
                    console.log(userDocRef)
                }
            })();
        },[]); // on component mount/unmount
    */

    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        const userDocRef = await createuserDocumentFromAuth(user);
        console.log(userDocRef)
    }
    /*
        below method will not work as after being redirect all the components will unmount and we'll lost all the states
        instead use effects
        const logGoogleUserRedirect = async()=>{ 
            const {user} = await signInWithGoogleRedirect();
            // console.log(response);
            const userDocRef = await createuserDocumentFromAuth(user);
            console.log(userDocRef)
        }
    */
    return (
        <div>
            <h1>Sign In Page!</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>
            {/* <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button> */}
            <SignUpForm />
        </div>
    )
}
export default SignIn;