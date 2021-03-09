import React, { useEffect, useState } from 'react'
import firebaseInstance from '../config/firebase'

export default function Screen () {
    const [complete, setComplete] = useState([])
    const [incomplete, setIncomplete] = useState([])

    useEffect(() => {
        let ref = firebaseInstance
        .firestore()
        .collection('orders')
        //selects all documents where isReady value is false
        .where('isReady', '==', false)
        //listener acts whenever documents with this value changes
        ref.onSnapshot((snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        setIncomplete(data)
        })         
    }, [])

    useEffect(() => {
        let newRef = firebaseInstance
        .firestore()
        .collection('orders')
        //selects all documents where isReady value is true
        .where('isReady', '==', true)
        .where('isCollected', '==', false)
        //listener acts whenever documents with this value changes
        newRef.onSnapshot((snapshot) => {
            let newData = []
            snapshot.forEach((doc) => {
                newData.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            
        setComplete(newData) 
        })   
    }, [])
    
    return(
        <>
            <div>
                <h1>Incomplete</h1>
                {incomplete.map(i => {
                    return(
                       <p key={i.id}>{i.orderId}</p>
                   )
                })}
            </div>
            <div>
                <h1>Complete</h1>
                {complete.map(i => {
                    return(
                        <p key={i.orderId}>{i.orderId}</p>
                    )
                })}
            </div>
        </>
    )
}
