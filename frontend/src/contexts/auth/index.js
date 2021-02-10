import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, admin } from '../../services/firebase';

export const AuthContext = createContext();

export default function AuthProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null);
    const [userToken, setUserToken] = useState(null);

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    const signUp = (email, password, user_name, photo_url) => {
        return auth.createUserWithEmailAndPassword(email, password).then(creation => {
            return creation.user.updateProfile({
                displayName: user_name,
                photoURL: photo_url
            });
        });
    }

    const signOut = () => {
        return auth.signOut().then(() => {

        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(async () => {

        if(currentUser){
            setUserToken(await currentUser.getIdToken());
        }

    }, [currentUser]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return(
        <AuthContext.Provider value={{currentUser, signIn, signUp, signOut, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}