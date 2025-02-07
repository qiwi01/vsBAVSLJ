import  React, {useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider ({children}) {
    const[currentUser, setCurrrentUser] = useState(null);
    const[userLoggedIn, setUserLoggedIn] = useState(false);
    const[loading, setLoading] = useState(true); 

 
useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;

},[])
async function initializeUser(user) {
    if (user) {
        setCurrrentUser({ ...user });
        setUserLoggedIn(true);
    }else {
        setCurrrentUser(null);
        setUserLoggedIn(false);
     }
     setLoading(false);
    }

const value = {
    currentUser,
    userLoggedIn,
    loading,
}

return(
    <AuthContext.Provider value={value}>
        { !loading && children}
    </AuthContext.Provider>
)

}