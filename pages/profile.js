import React, { useEffect } from 'react'
import firebaseInstance from '../config/firebase'
import { useRouter } from 'next/router'
import { useAuth } from '../config/auth'

const Profile = () => {

    const router = useRouter()
    const { user, loading, isAuthenticated } = useAuth()

    useEffect(() => {
        console.log('the context', user)    
    }, [loading])
    

    const handleSignout = async () => {
        await firebaseInstance.auth().signOut()
        
        router.push('/')

    }

    //===========================================AUTHENTICATION
    if(loading){
        return(
            <>Loading...</>
        )
    }

    if(isAuthenticated === false) {
        router.push('/')
        return <>Du er ikke logget inn</>
    }

    return(
        <>
            <p>Profile</p>
            <button onClick={handleSignout}>Logg ut</button>
            {user && (
                <>
                <p>{user.email}</p>
                </>
            )}
        </>
    )
}

export default Profile
