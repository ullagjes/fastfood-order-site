
//REACT
import React, {useEffect, useState} from 'react';
//FIREBASE
import firebaseInstance from '../config/firebase';
import readCollection from '../database/readCollection';
//NEXT
import Link from 'next/link';
import { useRouter } from 'next/router';
//CONTEXT
import { useAuth } from '../config/auth';
import { useBasket } from '../contexts/BasketContext';
//STYLE
import { Flex, Box } from 'reflexbox';
import HeaderComponent from '../components/HeaderComponent'
import {  MenuContainer, MenuBase } from '../components/MenuComponents';
import { ShoppingCartComponent } from '../components/ShoppingCartComponent';

export default function Menu({ 
  menuItems, 
  extraItems, 
  drinks, 
  sides, 
  error 
  }) {
  
  if(error !== undefined){
    return(
      <p>En feil har oppstått: {error}</p>
    );
  };

  const router = useRouter();

  //=======================================USER AUTHENTICATION

  //Updates state with userid from login 
  const [userId, setUserId] = useState(null);
  const [count, setCount] = useState(null)
  const {user, loading, isAuthenticated} = useAuth();

  //Updates userId-state depending on user authentication
  useEffect(() => {
    if(user){
      console.log('the context', user.uid);
      console.log('loading', loading);
      console.log('auth', isAuthenticated);
      setUserId(user.uid);
      const counter = firebaseInstance
      .firestore()
      .collection('globals')
      .doc('counter');

      return counter.onSnapshot((snapshot) => {
        const val = snapshot.data();
        setOrderId(val.count)
      })

    }
  }, [user]);
 
  //==========================================HANDLING OF ORDER DATA
  
  //Custom hook, located in /contexts/BasketContext.js.
  const basket = useBasket();

  //Various states, updated with functions in form.
  const [isChecked, setIsChecked] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState({drink: 'none', price: 0});
  const [selectedSide, setSelectedSide] = useState({side: 'none', price: 0});
  const extrasCopy = [...selectedExtras];
  
  //Renders form for customizing burger.
  //Resets states for drink, extras and side.
  function showOptions(event) {
    setIsChecked(false);
    setSelectedItem(event.target.innerText);

    if(selectedExtras.length > 0) {
      setSelectedExtras([]);
    };
    if(selectedSide.side !== 'none') {
      setSelectedSide({side: 'none', price: 0});
    };
    if(selectedDrink.drink !== 'none') {
      setSelectedDrink({drink: 'none', price: 0});
    };
  };
  
  //Updates array with selected extras for each burger.
  //Also deletes unselected extras.
  function updateExtras(event, price, index) {
    if(event.target.checked) {
      setSelectedExtras([...selectedExtras, {title: event.target.value, price: price}]);
    } else {
      extrasCopy.splice(index, 1);
      setSelectedExtras(extrasCopy);
    };
  };

  //creates unique ordernumber, used to display orders in making / ready.
  const [orderId, setOrderId] = useState(count);
  
  
  async function createOrderId(){
    //setOrderId(orderId + 1);
    const counterRef = firebaseInstance
    .firestore()
    .collection('globals')
    .doc('counter')

    await firebaseInstance.firestore().runTransaction((transaction) => {
      return transaction.get(counterRef).then((doc) => {
        const count = doc.data().count;
        let newCount = count + 1;
        if (newCount > 5000) {
          newCount = 1;
        }
        transaction.update(counterRef, { count: newCount })
        setOrderId(newCount) 
      });

      
      
    })
  };

  //======================================================FIRESTORE 

  //adds customer order to firestore as a new document.
  //adds order receipt in user-collection in firestore. Attached to userID.
  //calls function creating orderID.

  async function handleSubmit(event) {
    event.preventDefault();
    createOrderId();
    const collection = firebaseInstance.firestore().collection('orders');
    
    await collection.doc().set({
      food: basket.menuItems,
      total: basket.total,
      orderId: orderId,
      user: userId,
      isReady: false,
      isCollected: false
    });

    const userCollection = firebaseInstance.firestore().collection('users');
    await userCollection.doc(userId).update({
      previousOrders: basket.menuItems
    });

    router.push('/receipt');
  };

  //============================================TESTING VALUES IN CONTEXT
  function testValues(){
    console.log('basket', basket.menuItems);
    //console.log('size', selectedSize);
    //console.log('extras', selectedExtras);
    //createOrderId()
    //console.log(orderId)
  };

  //=============================================ORDER FORM
  //Form is rendered when user clicks button with desired burger-type

  //const [selectedInput, setSelectedInput] = useState('selected')

  function renderOptions(){

    return(
      <MenuContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            basket.addMenuItems({
              food: selectedItem, 
              size: selectedSize, 
              extra: selectedExtras,
              drink: selectedDrink,
              side: selectedSide,
              price: 
              selectedSize.price 
              + selectedDrink.price 
              + selectedSide.price 
              + selectedExtras.reduce((prev, cur) => {
                return prev + cur.price
              }, 0)
            });
            setIsChecked(true);
            }}>
              <h2>Customize your <span>{selectedItem}</span></h2>
              <h3>Select size (must be filled in)</h3>
              <input 
              type="radio"
              id="small"
              value="small"
              name="size"
              onChange={e => setSelectedSize({size: e.target.value, price: 149})}
              required
              >
              </input>
              <label htmlFor="small">Small (149,-)</label><br></br>
              <input 
              type="radio"
              id="medium"
              value="medium"
              name="size"
              onChange={e => setSelectedSize({size: e.target.value, price: 159})}
              >
              </input>
              <label htmlFor="medium"> Medium (159,-)</label><br></br>
              <input 
              type="radio"
              id="large"
              value="large"
              name="size"
              onChange={e => setSelectedSize({size: e.target.value, price: 169})}
              >
              </input>
              <label htmlFor="large">Large (169,-)</label><br></br>
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
                      <label htmlFor={k.title}>{k.title} ({k.price},-)</label><br></br>
                  </>
                  );
                })
              }
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
                        onChange={e => setSelectedSide({side: e.target.value, price: 0 + m.price})}
                        >
                        </input>
                        <label htmlFor={m.title}>{m.title} ({m.price},-)</label><br></br>
                      </>
                      )
                    })
                }
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
                      onChange={e => setSelectedDrink({drink: e.target.value, price: 0 + h.price})}
                      >
                      </input>
                      <label
                      htmlFor={h.title}
                      >
                      {h.title} ({h.price},-)
                      </label><br></br>
                    </>
                  )}
                )}
              <br></br>
              <button type="submit">Add to order</button>
        </form>
      </MenuContainer>
    );
  };

  function hideOptions() {
    return(
     <MenuContainer>
       <article>
         <h2>Select one of our burgers above to get started!</h2>
       </article>
     </MenuContainer>
    );
  };

  //===========================================AUTHENTICATION
  if(loading){
    return(
      <>Loading...</>
    );
  };

  if(isAuthenticated === false) {
    router.push('/');
    return <>Du er ikke logget inn</>
  };
  
  //=========================================RENDER MENU

  return (
    <>
      <body>
        <HeaderComponent />
        <Flex flexDirection='column' mt='5em'>
          <button onClick={testValues}>test</button>
          <MenuBase>
            <Flex flexDirection='column' alignItems='center'>
              <h1>Menu</h1>
              {menuItems.map((i, index) => {
                return(
                  <button key={index} onClick={showOptions} >
                    {i.title}
                  </button>
                  ) 
                })
              }
            </Flex>
          </MenuBase>
          <main>
            {(isChecked === true) ? hideOptions() : renderOptions()}
          </main>  
          <ShoppingCartComponent>
            <h2>Your order ({basket.total},-)</h2>
              {basket.menuItems.map((j, index) => {
                return(
                  <div key={index + 1}>
                    <h3>{j.food} ({j.size.size})</h3>
                      {(j.side.side !== 'none') ? <p>{j.side.side}</p> : <></>}
                      {(j.drink.drink !== 'none') ? <p>{j.drink.drink}</p> : <></>}
                      {(j.extra.length !== 0) ?
                      <>
                        {j.extra.map((l, index) => {
                          return <p key={index}>{l.title}</p>
                          })
                        }
                      </>
                      : <></>
                      }
                      <p>Sum: {j.price},-</p>
                      <button onClick={() => {basket.removeMenuItem(index)}}className='remove'>X</button>
                  </div>
                  )
                })
              }
                
              {(basket.menuItems.length > 0) ? 
                <button type="submit" onClick={handleSubmit}> Place order!</button> 
                : <></>
              }
          </ShoppingCartComponent>
        </Flex>
      </body>
    </>
  )
      
}

//=============================================SSR DATA 

Menu.getInitialProps = async () => {
  
  try {
    const menuItems = await readCollection("menu");
    const extraItems = await readCollection("extras");
    const drinks = await readCollection("drinks");
    const sides = await readCollection("sides");
    
    
    return { menuItems, extraItems, drinks, sides };

  } catch (error) {
    return {
      error: error.message
    };
  };

};

/**/


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
