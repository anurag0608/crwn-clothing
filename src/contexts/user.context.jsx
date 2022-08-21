import { createContext, useState, useEffect} from "react"
import { onAuthChangeListner, createuserDocumentFromAuth, getCollectionAndDocuments } from "../utils/firebase/firebase.util";
/*
    React context allows us to pass down and use (consume) data in 
    whatever component we need in our React app without using props.
    In other words, React context allows us to share data (state) across our components more easily.
    more details: https://www.freecodecamp.org/news/react-context-for-beginners/#:~:text=React%20context%20caveats-,What%20is%20React%20context%3F,across%20our%20components%20more%20easily.

    Components which are hooked to this user context will re-render,
    but for bigger applications this can cause performance issues.
    Instead hook a listner to Auth object (returned from firebase). 
    Auth object basically tracks the use who currently signed in.
    Also on page refresh Auth object keeps its state same.
*/
export const UserContext = createContext({
    currentUser: null,
    currentUserCartItems: [], // here we will store the cart items of the current user, since we cant access the cart context from here
    setCurrentUserCartItems: ()=> null,
    setCurrentUser: () => null,
})

export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserCartItems, setCurrentUserCartItems] = useState([]);

    const value = {
        currentUser, setCurrentUser, currentUserCartItems
    };
    useEffect(()=>{ // when component mounts/unmounts
        const unsubscribe = onAuthChangeListner((user)=>{
            if(user){
                createuserDocumentFromAuth(user, {cartItems: []});
            }
            setCurrentUser(user);
        })

    },[])
    useEffect(()=>{
        (async()=>{
            if(currentUser){
                const userDoc = await getCollectionAndDocuments('users', currentUser.uid);
                setCurrentUserCartItems(userDoc.cartItems);
            }
        })();
    },[currentUser])
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
