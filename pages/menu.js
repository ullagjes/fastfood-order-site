
//REACT
import React, {useEffect, useState} from 'react';
//FIREBASE
import firebaseInstance from '../config/firebase';
import readCollection from '../database/readCollection';
//NEXT
import { useRouter } from 'next/router';
//CONTEXT
import { useAuth } from '../config/auth';
import { useBasket } from '../contexts/BasketContext';
//STYLE
import { Flex } from 'reflexbox';
import HeaderComponent from '../components/HeaderComponent'
import {  MenuContainer, MenuBase } from '../components/MenuComponents';
import { ShoppingCartComponent } from '../components/ShoppingCartComponent';


//Component receives data from Firestore through initial props
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

  //Updates userId-state depending on user authentication.
  //Creates an orderId with an external counter in Firestore.
  //Counter is updated in separate function.
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

  //Various states, states updated when user fills out the order form.
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
  //Also deletes extras if they are unselected.
  function updateExtras(event, price, index) {
    if(event.target.checked) {
      setSelectedExtras([...selectedExtras, {title: event.target.value, price: price}]);
    } else {
      extrasCopy.splice(index, 1);
      setSelectedExtras(extrasCopy);
    };
  };

  //orderId state is updated with count variable created earlier. 
  const [orderId, setOrderId] = useState(count);
  
  //Function updates count with counter-value in Firestore
  //This prevents creating the same orderId if two users order at the same time.
  async function createOrderId(){
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

  //Adds customer order to firestore as a new document.
  //Adds order receipt in user-collection in firestore. Attached to userID.
  //Calls function creating orderID.

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

  //=============================================ORDER FORM

  //Form is rendered when user clicks button with desired burger-type.
  //Onsubmit creates a temporary array in context containing clients order as well as the total price.

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
              <h2 className="formTitle">Customize your <span>{selectedItem}</span></h2>
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
    return <>You aren't logged in.</>
  };
  
  //=========================================RENDER MENU

  return (
    <main>
        <HeaderComponent />
        <Flex flexDirection='column' mt='5em' alignItems='center'>
          <MenuBase>
            <h1>Menu</h1>
            <Flex flexDirection='row' alignItems='center'>
              
              {menuItems.map((i, index) => {
                return(
                  <button key={index} onClick={showOptions}>
                    {i.title}
                  </button>
                  ) 
                })
              }
            </Flex>
          </MenuBase>
          
          {(isChecked === true) ? hideOptions() : renderOptions()}
         
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
    </main>
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