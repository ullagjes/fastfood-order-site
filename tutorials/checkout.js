//REACT
import React, {useEffect, useState} from 'react'
//FIREBASE
import firebaseInstance from '../config/firebase'
import readCollection from '../database/readCollection'
//NEXT
import Link from 'next/link'
import { useRouter } from 'next/router'
//CONTEXT
import { useAuth } from '../config/auth'
import { useBasket } from '../contexts/BasketContext'
//STYLE
import { ShoppingCartComponent } from '../components/ShoppingCartComponent'


function checkout(){

    const router = useRouter()
    const basket = useBasket()
    const [order, setOrder] = useState([])
    const [userId, setUserId] = useState(null)
    const {user, loading, isAuthenticated} = useAuth()

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
                console.log(data)
                setOrder(data)
            })   
            
            
        }
    }, [isAuthenticated])

    useEffect(() => {
        if(user){
        setUserId(user.uid)
        }
    }, [user])


    function checkData(){
        console.log(order[0].id)
    }

    async function remove(selected){
        console.log(selected)
        let newOrder = order.map(i => {
            return i.food
        })
        
        let filtered = newOrder[0].filter((menuItem) => {
            return (menuItem.food !== selected)
        })

        console.log(filtered)
        try {
            let newRef = await firebaseInstance
                .firestore()
                .collection('orders')
                
            await newRef.doc(order[0].id).update({
                food: filtered
            })
    
        } catch (error){
            console.log(error)
        }
        
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
  

    return (
        <>
        <ShoppingCartComponent>

            {(order.length > 0) ? order.map((i, index) => {
                console.log(i.id)
                return(
                <article key={index + i}>
                    {i.food.map((k, index) => {
                        
                        return(
                            <div>
                                <h3 key={index + k}>{k.food} ({k.size.size})</h3>
                                <ul>
                                    <li>{k.drink.drink}</li>
                                    <li>{k.side.side}</li>
                                    {k.extra.map((l, index) => {
                                        return(
                                            <li>{l.title}</li>
                                        )
                                    })}
                                    
                                </ul>
                                <p>Price: {k.price},-</p>
                                <button onClick={() => {remove(k.food)}}>Remove</button>
                            </div>
                            )
                        }
                    )}
                    <p>Sum: {i.total},-</p>
                    <button>Place order!</button>
                </article>
                )
                
            })
            
            : <p>Hallo</p>}
            
              
               
        </ShoppingCartComponent>
            <button onClick={checkData}>test</button>
        </>
        
    )
}

export default checkout

/**<h2>Your order ({basket.total},-)</h2>
              {basket.menuItems.map((j, index) => {
                return(
                  <div key={index + 1}>
                    <h3>{j.food} ({j.size.size})</h3>
                  
                    {(j.side.side !== 'none') ? 
                      <>
                        <p>{j.side.side}</p>
                      </>
                      : <></>
                    }
                  
                    {(j.drink.drink !== 'none') ?
                      <>
                        <p>{j.drink.drink}</p>
                      </>
                      : <></>
                    }
                  
                    {(j.extra.length !== 0) ?
                      <>
                          {j.extra.map((l, index) => {
                              return <p key={index}>{l.title}: {l.price},-</p>
                            })
                      }
                      </>
                      : <></>
                    }
                  <p>Sum: {j.price},-</p>
                  <button 
                  onClick={() => {basket.removeMenuItem(index)}}
                  className='remove'
                  >X
                  </button>
                </div>
                )
              })}
              <h4>Total: {basket.total},-</h4> 
              
              {(basket.menuItems.length > 0) ? 
                <button type="submit"> Place order!</button> 
                : <></>
              } */