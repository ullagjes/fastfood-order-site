
import React, {useEffect, useState} from 'react'
import firebaseInstance from '../config/firebase'
import readCollection from '../database/readCollection'
//import { useAuth } from '../config/auth'
//import { useRouter } from 'next/router'
import { useBasket } from '../contexts/BasketContext'

export default function Test({ menuItems, registeredOrders, error }) {
  if(error !== undefined){
    return(
      <p>En feil har oppstått: {error}</p>
    )
  }
  //USER DATA
  const [userId, setUserId] = useState(null)
  const [userDisplayName, setUserDisplayName] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    firebaseInstance.auth().onAuthStateChanged((user) => {
      if(user) {
        console.log(user.email)
        setUserId(user.uid)
        setUserDisplayName(user.email)
        setIsLoggedIn(true)
      } else {
        console.log('wups')
        setUserId(null)
        setIsLoggedIn(false)
      }
    })
  }, [])
  
  async function handleSignOut() {
    await firebaseInstance.auth().signOut()
    setUserDisplayName(null)
    console.log('signed out', isLoggedIn)
  }

  //ORDER DATA
  const [quantity, setQuantity] = useState(null)
  const basket = useBasket()

  //creates unique ordernumber, used to display orders in making / ready
  const [orderId, setOrderId] = useState(1000 + registeredOrders.length)
  function createOrderId(){
    setOrderId(orderId + 1)
  }

  function countItems(event){
    setQuantity(event.target.value)
  }

  //FIRESTORE 

  //adds customer order to firestore as a new document
  //calls function creating orderID
  async function handleSubmit(event) {
    event.preventDefault()
    createOrderId()
    const collection = firebaseInstance.firestore().collection('orders')
    
    await collection.doc().set({
      food: basket.menuItems,
      orderId: orderId,
      user: userId,
      isReady: false,
      isCollected: false
    })

    const userCollection = firebaseInstance.firestore().collection('users')
    await userCollection.doc(userId).update({
      previousOrders: basket.menuItems
    })


    //setOrder([])

    //router.push('/screen')

  }

  function testValues(){
    console.log(basket.menuItems)
  }
  //MENU RENDER 

  return (
    <>

      <div>
        <button onClick={testValues}>Test</button>
        <p>{userDisplayName}</p>
        <button onClick={handleSignOut}>Sign out</button>
        {menuItems.map(i => {
          return(

            <form 
            key={i.id} 
            //onSubmit={event => addToOrder(event, i.title, i.id)}
            onSubmit={(event) => {
              event.preventDefault()
              basket.addMenuItems({
                title: i.title,
                id: i.id
              })
            }}
            
            >
              <label>{i.title}</label>
              <br></br>
              <input 
              type="number" 
              name="quantity" 
              id="quantity"
              onChange={event => countItems(event)}
              >
              </input>
              <button type="submit">Add</button>
            </form>
            
            )
          })
        }
        <div>{basket.menuItems.map((j, index) => {
          return(
            <>
              <p key={index}>{j.title} {j.quantity}</p>
              <button onClick={basket.removeMenuItem}>Remove</button>
            </>
            
            
          )
        })}</div>
        <button onClick={handleSubmit}>Bestill</button>
      </div> 

    </>
  )
}


Test.getInitialProps = async () => {
  
  try {
    const menuItems = await readCollection("menu")
    const registeredOrders = await readCollection("orders")
    
    return { menuItems, registeredOrders }

  } catch (error) {
    return {
      error: error.message
    }
  }
  

}

/*


            //<div key={i.id} id={i.id}>
              //<p>{i.title}</p>
              //<input type="number" name="quantity" onChange={countItems}></input>
              //<button onClick={addToOrder(i.title)}>Add</button>
            //</div>
//empty array filled with menuitems. 
  //later exported to firestore in separate function
  //const [order, setOrder] = useState([])
  //const [quantity, setQuantity] = useState(null)
  //adds menuitems to customer order.
  /*async function addToOrder(event, title, id) {
    event.preventDefault()
    /*const selectedItem = await {
      title: title,
      quantity: quantity,
      id: id
    }


    setOrder(prevOrder => [...prevOrder, selectedItem])
    setQuantity(null)
  }
*<div key={i.id} id={i.id}>
              <p>{i.title}</p>
              <input type="number" name="quantity"></input>
              <button onClick={addToOrder}>Add</button>
            </div>
            <button onClick={addToDatabase}>Bestill</button>
            <pre>
        <code>
          {JSON.stringify(incomplete, null, 2)}
        </code>
      </pre> 
      <form 
              name="menu"
              id="menu"
              action="/"
              method="GET"
              onSubmit={handleSubmit}
            >
              <h2 key={i.id}>{i.title}</h2>
              <label htmlFor={i.title}>Antall</label>
              <input type="number" name={i.title}></input>
              <button onClick={addToOrder}>Add to order</button>
            </form>
      
      
  /*async function writeDocument(event) {
    let id = event.target.parentElement.id
    let collection = await firebaseInstance.firestore().collection('menu')
    let document = await collection.doc(id).update({
      title: 'burger',
      isSelected: false
    })
    let clickedItem = {
        id: document.id,
        ...document.data()
      }
    //console.log(document) 


      
  //const userContext = useAuth()

  /*useEffect(() => {
    console.log(userContext)
  }, [userContext])*/

  //const router = useRouter()
  //}
