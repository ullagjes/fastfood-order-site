//REACT
import React, { useEffect, useState } from 'react'
//FIREBASE
import firebaseInstance from '../config/firebase'
//COMPONENTS
import OrderComponent from '../components/OrderComponent'

export default function Screen () {
    const [complete, setComplete] = useState([])
    const [incomplete, setIncomplete] = useState([])

    //=========================================REAL TIME DATA
    useEffect(() => {
        let ref = firebaseInstance
        .firestore()
        .collection('orders')
        //selects all documents where isReady value is false
        .where('isReady', '==', false)
        //listener acts whenever documents with this value changes
        return ref.onSnapshot((snapshot) => {
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
        return newRef.onSnapshot((snapshot) => {
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
            <OrderComponent>
                <article>
                    <h1>In the works</h1>
                    {incomplete.map(i => {
                        return(
                            <p key={i.id} className={'orderNumber'}>{i.orderId} </p>
                            )
                        })
                    }
                </article>
                <article>
                    <h1>Ready for pick up</h1>
                    {complete.map(i => {
                        return(
                            <p key={i.orderId} className={'orderNumber'}>{i.orderId}</p>
                            )
                        })
                    }
                </article>
            </OrderComponent>
        </>
    )
}
