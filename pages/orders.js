
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

    function testValues(){
        console.log('complete', complete)
        console.log('pending', incomplete)
    }

    return(
        <>  
        <button onClick={testValues} >Test</button>
            <main>
                <h1>Pending orders: {incomplete.length}</h1>
                {incomplete.map((i, index) => {
                    
                    return(
                        <article id={i.id} key={index + i}>
                            <h2>{i.orderId}</h2>
                            
                                {i.food.map((j, index) => {
                                    return(
                                        <div key={index + j}>
                                            <h3>{j.food}, ({j.size.size}) with: </h3>
                                            <ul>
                                                {j.extra.map((k, index) => {
                                                    return(
                                                    <li key={index + k}>{k.title}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        
                                    )
                                    })}
                            
                            <button type="submit" onClick={orderFinished}>Order complete</button>
                        </article>
                  
                    )
                })}

                <h1>Orders ready to collect: {complete.length}</h1>
                {complete.map((i, index) => {
                    
                    return(
                        <article id={i.id} key={index + i}>
                            <h2>{i.orderId}</h2>
                            
                                {i.food.map((j, index) => {
                                    return(
                                        <div key={index + j}>
                                            <h3>{j.food}, ({j.size.size}) with: </h3>
                                            <ul>
                                                {j.extra.map((k, index) => {
                                                    return(
                                                    <li key={index + k}>{k.title}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        
                                    )
                                    })}
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