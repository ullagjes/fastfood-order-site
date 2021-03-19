//REACT
import React, { useEffect } from 'react'
//FIREBASE
import firebaseInstance from '../config/firebase'
//NEXT
import { useRouter } from 'next/router'
//CONTEXT
import { useAuth } from '../config/auth'
//STYLE
import { MenuContainer, MenuBase } from '../components/MenuComponents'

const Profile = () => {

    const router = useRouter();
    const { user, loading, isAuthenticated } = useAuth();

    useEffect(() => {
        console.log('the context', user)    
    }, [loading]);
    
    const handleSignout = async () => {
        await firebaseInstance.auth().signOut();
        router.push('/');
    };

    //===========================================AUTHENTICATION
    if(loading){
        return(
            <>Loading...</>
        );
    };

    if(isAuthenticated === false) {
        router.push('/')
        return <>Du er ikke logget inn</>
    };

    return(
        <MenuBase>
            <p>Profile</p>
            <button onClick={handleSignout}>Logg ut</button>
            {user && (
                <>
                <p>{user.email}</p>
                </>
            )}
        </MenuBase>
    );
};

export default Profile;
