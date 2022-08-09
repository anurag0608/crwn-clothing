import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import { getRedirectResult } from 'firebase/auth';
import {
  LocalSignInWithEmailAndPassword,
  auth, // for redirect login
  signInWithGooglePopup, 
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.util";
import {createuserDocumentFromAuth} from '../../utils/firebase/firebase.util'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in.form.styles.scss';

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;
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
    await signInWithGooglePopup();
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password} = formFields;
    try {
      await LocalSignInWithEmailAndPassword(email, password);
      // reset form fields
      resetFormFields();
    } catch (err) {
      switch(err.code){
            case 'auth/user-not-found':
                alert('user not found');
                break;
            case 'auth/wrong-password':
                alert('wrong password');
                break;
            default:
                alert('something went wrong');
      }
      console.log(err)
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email & password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required={true}
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required={true}
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
            <Button type='submit'>Sign In</Button>
            <Button type='button' onClick={logGoogleUser} buttonType='google'>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
