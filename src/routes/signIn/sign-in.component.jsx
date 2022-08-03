import { signInWithGooglePopup } from '../../utils/firebase/firebase.util';
import { createuserDocumentFromAuth } from '../../utils/firebase/firebase.util';
const SignIn = ()=>{
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        const userDocRef = await createuserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In Page!</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>
        </div>
    )
}
export default SignIn;