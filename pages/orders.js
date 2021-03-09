
import React, { useState, useEffect } from 'react'
import firebaseInstance from '../config/firebase'

export default function Orders(){
    
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

    function orderFinished(event){
        event.preventDefault()
        const selectedOrderId = event.target.parentElement.id
        const collection = firebaseInstance.firestore().collection('orders') 
        collection.doc(selectedOrderId).update({
            isReady: true
        })
    }

    function orderCollected(event){
        event.preventDefault()
        const selectedOrderId = event.target.parentElement.id
        const collection = firebaseInstance.firestore().collection('orders') 
        collection.doc(selectedOrderId).update({
            isCollected: true
        })
    }


    return(
        <>
            <main>
                <h1>Pending orders: {incomplete.length}</h1>
                {incomplete.map(i => {
                    
                    return(
                        <article key={i.id} id={i.id}>
                            <h2>{i.orderId}</h2>
                            <ul>
                                {i.food.map(j => {
                                    return(
                                        <li key={j.id}>{j.title}</li>
                                    )
                                    })}
                            </ul>
                            <button type="submit" onClick={orderFinished}>Order complete</button>
                        </article>
                  
                    )
                })}

                <h1>Orders ready to collect: {complete.length}</h1>
                {complete.map(i => {
                    
                    return(
                        <article key={i.id} id={i.id}>
                            <h2>{i.orderId}</h2>
                            <ul>
                                {i.food.map(j => {
                                    return(
                                        <li key={j.id}>{j.title}</li>
                                    )
                                    })}
                            </ul>
                            <button type="submit" onClick={orderCollected}>Order collected</button>
                        </article>
                  
                    )
                })}
            </main>
        </>
    )
    

}

/*Orders.getInitialProps = async () => {

    try {
        const orderData = await readCollection('orders')
        return { orderData }

    } catch (error) {
        return {
            error: error.message
        }
    }
}*/