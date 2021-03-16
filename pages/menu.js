
import React, {useEffect, useState} from 'react'
import firebaseInstance from '../config/firebase'
import readCollection from '../database/readCollection'
import Link from 'next/link'
import { useAuth } from '../config/auth'
import { useRouter } from 'next/router'
import { useBasket } from '../contexts/BasketContext'


export default function Test({ menuItems, extraItems, drinks, sides, sizes, registeredOrders, error }) {
  if(error !== undefined){
    return(
      <p>En feil har oppstått: {error}</p>
    )
  }

  const router = useRouter()

  //=======================================USER AUTHENTICATION
  //Updates state with userid from login 
  const [userId, setUserId] = useState(null)
  const {user, loading, isAuthenticated} = useAuth()

  useEffect(() => {
    if(user){
      console.log('the context', user.uid)
      console.log('loading', loading)
      console.log('auth', isAuthenticated)
      setUserId(user.uid)
    }
  }, [user])
 
  //============================================ORDER DATA
  
  //Custom hook, located in /contexts/BasketContext.js
  const basket = useBasket()

  //Various states, updated with functions in form
  const [isChecked, setIsChecked] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [selectedSide, setSelectedSide] = useState(null)
  const extrasCopy = [...selectedExtras]
  
  //Renders form for customizing burger
  function showOptions(event) {
    setIsChecked(false)
    setSelectedItem(event.target.innerText)
    if(selectedExtras.length > 0){
      setSelectedExtras([])
    }
  }
  
  //Updates array with selected extras for each burger
  function updateExtras(event, price, index) {
    if(event.target.checked){
      setSelectedExtras([...selectedExtras, {title: event.target.value, price: price}])
    } else {
      extrasCopy.splice(index, 1)
      setSelectedExtras(extrasCopy)
    }
  }

  //creates unique ordernumber, used to display orders in making / ready
  const [orderId, setOrderId] = useState(1000 + registeredOrders.length)
  function createOrderId(){
    setOrderId(orderId + 1)
  }
  //======================================================FIRESTORE 

  //adds customer order to firestore as a new document
  //adds order receipt in user-collection in firestore. Attached to userID
  //calls function creating orderID

  async function handleSubmit(event) {
    event.preventDefault()
    createOrderId()
    const collection = firebaseInstance.firestore().collection('orders')
    
    await collection.doc().set({
      food: basket.menuItems,
      total: basket.total,
      orderId: orderId,
      user: userId,
      isReady: false,
      isCollected: false
    })

    const userCollection = firebaseInstance.firestore().collection('users')
    await userCollection.doc(userId).update({
      previousOrders: {orderId: basket.menuItems}
    }) 

    router.push('/receipt')
  }

  //============================================TESTING VALUES IN CONTEXT
  function testValues(){
    console.log('basket', basket.menuItems)
    console.log('size', selectedSize)
    console.log('extras', selectedExtras)
  
  }

  //=============================================ORDER FORM
  //Form is rendered when user clicks button with desired burger-type
  function renderOptions(){
    
    return(
      <>
        <h2>{selectedItem}</h2>
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            basket.addMenuItems({
              food: selectedItem, 
              size: selectedSize, 
              extra: selectedExtras,
              drink: selectedDrink,
              side: selectedSide,
              price: selectedSize.price + selectedDrink.price + selectedSide.price + selectedExtras.reduce((prev, cur) => {
                return prev + cur.price
              }, 0)
            })
            setIsChecked(true)
          }}>
          <h3>Select size (must be filled in)</h3>
          <input 
          type="radio"
          id="small"
          value="small"
          name="size"
          onChange={e => setSelectedSize({size: e.target.value, price: 149})}
          >
          </input>
          <label 
          htmlFor="small"
          >
          Small (149,-)
          </label>
          <input 
          type="radio"
          id="medium"
          value="medium"
          name="size"
          onChange={e => setSelectedSize({size: e.target.value, price: 159})}
          >
          </input>
          <label 
          htmlFor="medium"
          >
          Medium (159,-)
          </label>
          <input 
          type="radio"
          id="large"
          value="large"
          name="size"
          onChange={e => setSelectedSize({size: e.target.value, price: 169})}
          >
          </input>
          <label 
          htmlFor="large"
          >
          Large (169,-)
          </label>
          <br></br>
          <h3>Add extras</h3>
          {extraItems.map((k, index) => {
            return(
              <>
                <input
                type="checkbox"
                name={k.title}
                id={k.title}
                value={k.title}
                onChange={(event) => {updateExtras(event, k.price, index)}}
                >
                </input>
                <label
                htmlFor={k.title}
                >
                  {k.title} ({k.price},-)
                </label>
              </>
              )
            })
          }
          <br></br>
          <h3>Add side order</h3>
          {sides.map((m, index) => {
            return(
              <>
                <input
                key={index + m}
                type="radio"
                name="side"
                id={m.title}
                value={m.title}
                onChange={e => setSelectedSide({side: e.target.value, price: m.price})}
                >
                </input>
                <label
                htmlFor={m.title}
                >
                {m.title} ({m.price},-)
                </label>

              </>
            )
          })}
          <br></br>
          <h3>Add drink</h3>
          {drinks.map((h, index) => {
            return(
              <>
                <input
                key={index + h}
                type="radio"
                name="drink"
                id={h.title}
                value={h.title}
                onChange={e => setSelectedDrink({drink: e.target.value, price: h.price})}
                >
                </input>
                <label
                htmlFor={h.title}
                >
                {h.title} ({h.price},-)
                </label>

              </>
            )
          })}
          <br></br>
          <button type="submit">Add to order</button>
        </form>
        
      </>
    )
  }

  function hideOptions() {
    return(
     <></>
    )
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
  
  //=========================================RENDER MENU

  return (
    <>
      <p>{user.email}</p>
      <Link href="/profile">Min side</Link>
      <div>
        <button onClick={testValues}>Test</button>
        {menuItems.map((i, index) => {
          return(
            <button key={index} onClick={showOptions}>
              {i.title}
            </button>
          )
        })
        }
        {(isChecked === true) ? hideOptions() : renderOptions()}
        <div>
          <h3>Your order</h3>
          {basket.menuItems.map((j, index) => {
            return(
              <div key={index + 1}>
                <h4>{j.food} ({j.size.size}: {j.size.price},-)</h4>
                <p>With:</p>
                <ul>
                  <li>{j.side.side}: {j.side.price},-</li>
                  <li>{j.drink.drink}: {j.drink.price},-</li>
                  {j.extra.map((l, index) => {
                    return(
                      <li key={index}>{l.title}: {l.price},-</li>
                    )
                  })}
                </ul>
                <p>Sum: {j.price},-</p>
                <button onClick={() => {basket.removeMenuItem(index)}}>Remove from order</button>
              </div>
              )
            })}
            <p>Total: {basket.total},-</p>
          </div>
          {(basket.menuItems.length > 0) ? <button type="submit" onClick={handleSubmit}> Place order!</button> : <></>}
          
      </div> 

    </>
  )
}

//=============================================SSR DATA 

Test.getInitialProps = async () => {
  
  try {
    const menuItems = await readCollection("menu")
    const extraItems = await readCollection("extras")
    const drinks = await readCollection("drinks")
    const sides = await readCollection("sides")
    const sizes = await readCollection("Sizes")
    const registeredOrders = await readCollection("orders")
    
    return { menuItems, extraItems, drinks, sides, sizes, registeredOrders }

  } catch (error) {
    return {
      error: error.message
    }
  }

}


/*

/*useEffect(() => {
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
  }, [])*/
  
  /*async function handleSignOut() {
    await firebaseInstance.auth().signOut()
    setUserDisplayName(null)
    console.log('signed out', isLoggedIn)
  }



 {menuItems.map((i, index) => {
          return(
            <form 
            key={index} 
            //onSubmit={event => addToOrder(event, i.title, i.id)}
            onSubmit={(event) => {
              event.preventDefault()
              basket.addMenuItems({
                title: i.title,
                id: i.id,
                quantity: 1
              })
            }}
            >
              <h2>{i.title}</h2>
              <br></br>
              
              <button type="submit">Add</button>
            </form>
            
            )
          })
        }
        <div>{basket.menuItems.map((j, index) => {
          return(
              <>
                <p key={index} id={j.id}>{j.title} {j.quantity}</p>
                <button onClick={increaseCount}> + </button>
                <button onClick={decreaseCount}> - </button>
              </>
            )
          })
        }
        </div>
        <button onClick={handleSubmit}>Bestill</button>

<p key={index}>{j.title} {j.quantity}</p>

<button onClick={basket.removeMenuItem}> - </button>
<input 
              type="number" 
              name="quantity" 
              id="quantity"
              onChange={event => countItems(event)}
              >
              </input>

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
