import React, { useState } from 'react'
import Link from 'next/link'
import firebaseInstance from '../config/firebase'

const Signup = () => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
            //firebaseInstance.auth().onAuthStateChanged((user) => {
                //addToUsers(user)
            //})
            
        } catch (error) {
            setError(error.message)
            console.log('Noe gikk galt')
        }
    }

    /*function addToUsers(user) {
        const userCollection = firebaseInstance.firestore().collection('users')
        userCollection.doc(user.uid).set({
            userId: user.uid,
            email: user.email,
            previousOrders: []
        })
    }*/
    return(
        <>
            <Link href="/login">Har du allerede bruker? Logg inn her.</Link>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="email" 
                placeholder="email" 
                onChange={event => setEmail(event.target.value)}
                />
                <input 
                type="password" 
                name="password" 
                placeholder="password" 
                onChange={event => setPassword(event.target.value)}
                />
                <button type="submit">Registrer deg</button>
                {error && <p>{error}</p>}
            </form>
        </>
        
    )
}

export default Signup