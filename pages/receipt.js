import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebaseInstance from '../config/firebase'
import { useAuth } from '../config/auth'
import Link from 'next/link'

export default function Receipt () {
    
    const { user, loading, isAuthenticated } = useAuth()
    
    const [userOrder, setUserOrder] = useState([])
    const [orderComplete, setOrderComplete] = useState([])
    const [userId, setUserId] = useState(null)

    const router = useRouter()
    
    useEffect(() => {
        if(user){
            setUserId(user.uid)    
        }
    }, [loading])

    useEffect(() => {
        if(user){
            let ref = firebaseInstance
            .firestore()
            .collection('orders')
            //selects all documents where user value matches user id in context
            .where('user', '==', userId)
            .where('isReady', '==', false)
            .where('isCollected', '==', false)
            if(ref.empty){
                console.log('no document')
            }
            //listener acts whenever documents with this value changes
            ref.onSnapshot((snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })

                setUserOrder(data)
            })     
        }
    }, [userId])

    useEffect(() => {
        
        if(user){
            let newRef = firebaseInstance
            .firestore()
            .collection('orders')
            .where('user', '==', user.uid)
            //selects all documents where isReady value is true
            .where('isReady', '==', true)
            .where('isCollected', '==', false)
            //listener acts whenever documents with this value changes

            if(newRef.empty){
                console.log('nothing here!')
            }

            newRef.onSnapshot((snapshot) => {
                let newData = []
                snapshot.forEach((doc) => {
                    newData.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setOrderComplete(newData) 
            })     
        }
        

    }, [userOrder])



    function testValues(){
        
        console.log('user context', user.uid)
        console.log('email', user.email)
        console.log('realtime data', userOrder)
        console.log('complete', orderComplete)
        console.log(!user)
    }

    //===========================================AUTHENTICATION
    if(loading){
        return(
            <>Loading...</>
        )
    }

    if(isAuthenticated === false) {
        router.push('/login')
        return <>Du er ikke logget inn</>
    }
    
    return(
            <>
                <button onClick={testValues}>Test</button>
                <article>
                    <h1>Kvittering</h1>
                    <p>Takk for din bestilling! Ordrenummeret ditt er:</p>
                    {userOrder.map((i, index) => {
                        return <p key={index + i}>{i.orderId}</p>
                        })
                    }
                    <p>Du kan følge med på skjermen eller i appen for å se når bestillingen er klar.</p>
                </article>
                {orderComplete && orderComplete.map(j => {
                    return (
                        <p>{j.orderId} kan nå hentes ved disken</p>
                        )
                    })
                }
                {(orderComplete === []) ? <></> : <><p>Du har ingen bestillinger inne.</p></>}
                <Link href="/menu">Til meny</Link>
            </>

    )
}


/*export const getServerSideProps = async () => {
    try {
        const dataBase = await firebaseInstance.firestore().collection('orders')
        const currentUserOrder = await dataBase.get()

        userData = ['hei']

        currentUserOrder.forEach(doc => {
            userData.push({
                id: doc.id,
                ...doc.data()
            })
        })




        return { props: {userData } }

    } catch(error) {
        return {
            error: error.message
        }
    }
}*/

