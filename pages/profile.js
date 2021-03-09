import React, { useEffect } from 'react'
import firebaseInstance from '../config/firebase'
import { useRouter } from 'next/router'
import { useAuth } from '../config/auth'

const Profile = () => {

    const router = useRouter()
    const userContext = useAuth()

    useEffect(() => {
        console.log('the context', userContext)    
    }, [userContext])
    

    const handleSignout = async () => {
        await firebaseInstance.auth().signOut()
        
        router.push('/test')

    }

    return(
        <>
            <p>Profile</p>
            <button onClick={handleSignout}>Logg ut</button>
            {userContext && (
                <>
                <p>{userContext.email}</p>
                <p>{userContext.uid}</p>
                </>
            )}
        </>
    )
}

export default Profile
