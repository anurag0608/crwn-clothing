import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createuserDocumentFromAuth } from "../../utils/firebase/firebase.util";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {displayName, email, password, confirmPassword} = formFields;
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }
        try{
            const response = await createAuthUserWithEmailAndPassword(email, password); // will return userAuth object
            const {user} = response
            const userDocRef = await createuserDocumentFromAuth(user, {displayName});
            console.log(userDocRef)
            // reset form fields
            resetFormFields();
        }catch(err){
            console.log('User creation error',err);
        }
    }
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }
    return(
        <div className="sign-up-form">
            <h1>Sign Up with your email & password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" placeholder="Name" name='displayName' value={displayName} required onChange={handleChange}/>
                <br/>
                <label>Email</label>
                <input type="email" placeholder="Email" name='email' value={email} required onChange={handleChange} />
                <br/>
                <label>Password</label>
                <input type="password" placeholder="Password" name='password' value={password} required onChange={handleChange} />
                <br/>
                <label>Confirm Password</label>
                <input type="password" placeholder="Password" name='confirmPassword' value={confirmPassword} required onChange={handleChange} />
                <br/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
export default SignUpForm;