import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import {
  createAuthUserWithEmailAndPassword,
  createuserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up.form.styles.scss';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const {setCurrentUser} = useContext(UserContext); // hook to user context change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      ); // will create account in firebase and return user object
      const { user } = response; // contains access tokens and other important details
      
      setCurrentUser(user);

      const userDocRef = await createuserDocumentFromAuth(user, {
        displayName,
      }); // will create user document using user object and displayName in firestore
      // console.log(userDocRef);
      // reset form fields
      resetFormFields();
    } catch (err) {
      switch(err.code){
            case 'auth/email-already-in-use':
                alert('email already in use');
                break;
            default:
                console.log(err);
      }
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email & password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required={true}
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required={true}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
