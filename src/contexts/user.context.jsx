import { createContext, useState } from "react"
/*
    React context allows us to pass down and use (consume) data in 
    whatever component we need in our React app without using props.
    In other words, React context allows us to share data (state) across our components more easily.
    more details: https://www.freecodecamp.org/news/react-context-for-beginners/#:~:text=React%20context%20caveats-,What%20is%20React%20context%3F,across%20our%20components%20more%20easily.
*/
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {
        currentUser, setCurrentUser
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
