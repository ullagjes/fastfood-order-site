//REACT
import React, { useEffect, useState } from 'react';
//FIREBASE
import firebaseInstance from '../config/firebase';
//NEXT
import { useRouter } from 'next/router';
import Link from 'next/link';
//CONTEXT
import { useAuth } from '../config/auth'
//COMPONENTS
import HeaderComponent from '../components/HeaderComponent'
//STYLE
import { MenuBase, MenuContainer } from '../components/MenuComponents';
import ReceiptComponent from '../components/ReceiptComponent'
import { Box, Flex } from 'reflexbox';

export default function Receipt () {
    
    const { user, loading, isAuthenticated } = useAuth();
    
    const [userOrder, setUserOrder] = useState([]);
    const [orderComplete, setOrderComplete] = useState([]);
    const [userId, setUserId] = useState(null);

    const router = useRouter();

    //===============================================ORDERDATA
    useEffect(() => {
        if(user){
            return setUserId(user.uid)
        }
    }, [loading]);

    

    //Realtime data from firestore. 
    //Is filtered with userid from Auth context.
    useEffect(() => {
        if(user){
            let ref = firebaseInstance
            .firestore()
            .collection('orders')
            //selects all documents where user value matches user id in context.
            .where('user', '==', userId)
            .where('isReady', '==', false)
            .where('isCollected', '==', false)
            if(ref.empty){
                console.log('no document')
            };
            //listener acts whenever documents with this value changes.
            return ref.onSnapshot((snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setUserOrder(data);
            });
        };
    }, [userId]);


    //Realtime data from firestore. 
    //Updates when order is changed/updated in firestore.
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
            };

            return newRef.onSnapshot((snapshot) => {
                let newData = []
                snapshot.forEach((doc) => {
                    newData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setOrderComplete(newData) 
            });     
        };
    }, [userOrder]);

    //==========================================TEST VALUES
    //function testValues(){
    //    console.log('user context', user.uid)
        //console.log('email', user.email)
    //    console.log('realtime data', userOrder)
        //console.log('complete', orderComplete)
        //console.log(!user)
    //};

    //===========================================AUTHENTICATION
    if(loading) {
        return(
            <>Loading...</>
        );
    };

    if(isAuthenticated === false) {
        router.push('/')
        return <>Du er ikke logget inn</>
    };
    
    //===========================================RENDERED RECEIPT
    return(
            <>  
                <HeaderComponent />
                
                <Box width={[1]} mt='8em'>
                    <ReceiptComponent>
                            <div>
                                <h1>Receipt</h1>
                            
                                <p>Thank you for your order. Keep an eye on the screen by the counter or in your app to see when your order is done.</p>
                            </div>
                            <>
                                {userOrder.map((l, index) => {
                                    return(
                                        <article>
                                            <h2>{l.orderId}</h2>
                                            <div key={index + l}>{l.food.map((j, index) => {
                                                return(
                                                    <div key={index + j}>
                                                        {j.food} 
                                                        ({j.size.size}) 

                                                        {(j.extra !== 'none') ? j.extra.map((l) => {
                                                            return <p>{l.title}</p>
                                                        }) : <></> }

                                                        {(j.drink.drink !== 'none') ? <p> {j.drink.drink} </p> : <></> }

                                                        {(j.side.side !== 'none') ? <p>and {j.side.side}</p> : <></> }

                                                    </div>
                                                    )
                                                })}
                                            </div>
                                            <p>Sum: {l.total}</p>
                                        </article>
                                        )
                                    })
                                }
                            </>
                            <h2>Order status:</h2>
                            {userOrder.map((i, index) => {
                                return <p className="orderNumber" key={index + i}>{i.orderId} is cooking.</p>
                                })
                            }
                            {orderComplete && orderComplete.map(j => {
                                return (
                                    <p className="orderNumber">{j.orderId} is ready.</p>
                                    )
                                })
                            }
                            {(orderComplete === []) ? 
                                <>
                                    <p>No orders.</p>
                                </> 
                                : <></> 
                            }
                    </ReceiptComponent>
                </Box>
            </>
    );
};


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

