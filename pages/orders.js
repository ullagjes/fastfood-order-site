
//REACT
import React, { useState, useEffect } from 'react';
//FIREBASE
import firebaseInstance from '../config/firebase';
//COMPONENTS
import OrderComponent from '../components/OrderComponent';

export default function Orders(){
    const [complete, setComplete] = useState([]);
    const [incomplete, setIncomplete] = useState([]);

    //================================================FIRESTORE REAL TIME DATA
    //Incomplete orders
    useEffect(() => {
        let ref = firebaseInstance
        .firestore()
        .collection('orders')
        //selects all documents where isReady value is false
        .where('isReady', '==', false)
        //listener acts whenever documents with this value changes
        return ref.onSnapshot((snapshot) => {
            let data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        setIncomplete(data);
        });   
    }, []);

    //Complete orders
    useEffect(() => {
        let newRef = firebaseInstance
        .firestore()
        .collection('orders')
        //selects all documents where isReady value is true
        .where('isReady', '==', true)
        .where('isCollected', '==', false)
        //listener acts whenever documents with this value changes
        return newRef.onSnapshot((snapshot) => {
            let newData = [];
            snapshot.forEach((doc) => {
                newData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        setComplete(newData);
        });   
    }, []);

    //===========================================UPDATE FIRESTORE DATA

    function orderFinished(event) {
        event.preventDefault();
        const selectedOrderId = event.target.parentElement.id;
        const collection = firebaseInstance.firestore().collection('orders') ;
        collection.doc(selectedOrderId).update({
            isReady: true
        });
    };

    function orderCollected(event) {
        event.preventDefault();
        const selectedOrderId = event.target.parentElement.id;
        const collection = firebaseInstance.firestore().collection('orders'); 
        collection.doc(selectedOrderId).update({
            isCollected: true
        });
    };

    //=========================================TEST VALUES
    function testValues(){
        console.log('complete', complete);
        console.log('pending', incomplete);
    };

    return(
        <>  
            <main className='globalMain'>
                <h1>BØRRES BITCHIN' KITCH'N</h1>
                <OrderComponent>
                    <article>
                        <h2>Pending orders: {incomplete.length}</h2>
                        <div className='orderContainer'>
                            {incomplete.map((i, index) => {
                                return(
                                    <div id={i.id} key={index + i} className='order'>
                                        <h3>{i.orderId}</h3>
                                        <button type="submit" onClick={orderFinished}>Order complete</button>
                                        {i.food.map((j, index) => {
                                            return(
                                                <div key={index + j}>
                                                    <h4>{j.food} ({j.size.size}) with: </h4>
                                                    <ul>
                                                        <li>{j.drink.drink}.</li>
                                                        <li>{j.side.side}.</li>
                                                        {j.extra.map((k, index) => {
                                                            return(
                                                            <li key={index + k}>Extra {k.title}.</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div> 
                                            )
                                        })}
                                    </div>  
                                )}
                            )}
                        </div>
                    </article>
                
                    <article>
                        <h2>Orders ready to collect: {complete.length}</h2>
                        <div className='orderContainer'>
                            {complete.map((i, index) => {
                                return(
                                    <div id={i.id} key={index + i} className='order'>
                                        <h3>{i.orderId}</h3>
                                        <button type="submit" onClick={orderCollected}>Order collected</button>
                                        {i.food.map((j, index) => {
                                            return(
                                                <div key={index + j}>
                                                    <h4>{j.food} ({j.size.size}) with:</h4>
                                                    <ul>
                                                        <li>{j.drink.drink}.</li>
                                                        <li>{j.side.side}.</li>
                                                        {j.extra.map((k, index) => {
                                                            return(
                                                            <li key={index + k}>Extra {k.title}.</li>
                                                            )}
                                                        )}
                                                    </ul>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </article>
                </OrderComponent>
            </main>
        </>
    );
};
