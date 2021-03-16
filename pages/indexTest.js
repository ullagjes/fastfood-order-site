import firebaseInstance from '../config/firebase'
import readCollection from '../database/readCollection'
import { useState, useEffect } from 'react'


export default function Home({ menu, error }) {
  if(error !== undefined){
    return(
      <p>En feil har oppstått: {error}</p>
    )
  }

  return (
    <>
      <main>
        <h1>Menu</h1>
          {menu.map(i => {
            return (
              <article key={i.id}>
                <h2>{i.title}</h2>
                <button type="submit">Add to order</button>
              </article>
            )
        })}
        
      </main>
      <pre>
        <code>
          {JSON.stringify(menu, null, 2)}
        </code>
      </pre>
    </>
    
  )
}

export async function getServerSideProps(){
      
      const menu = await readCollection("menu")
      return { props: { menu } }

}

      

  
/*     


/*if(!firebase.apps.length ) {
  
  try {

  } catch {

  }
}

const ref = firebaseInstance.database().ref('bestillinger')

  const [product, setProduct] = useState(null)

  const handleClick = () => {
    ref.set({
      title: 'Burgers'
    })
  }  

  useEffect(() => {
    ref.on('value', (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        setProduct(data)
      })
  }, [])

  <div>
         <button onClick={handleClick}>Test</button> 
         {product && <p>{product.title}</p>}
        </div>



      let array = []
      
     
      
      const orderCollection = firebaseInstance.firestore().collection('orders')
      
      orderCollection.onSnapshot(snapshot => {
              
              snapshot.forEach((doc) => {
                array.push(doc.data())
              })
            })
      
      return { props: {menu, array}}*/


/*let doc = document._delegate_documenter.objectValue.proto.mapValue.fields* /

/**
  /*try {
    const collection = await firebaseInstance.firestore().collection('menu')
    const menuData = await collection.get()

    let menuItems = []
        menuData.forEach(item => {
            menuItems.push({
                id: item.id,
                ...item.data()
            })
        })

        return { menuItems }
  } catch (error) {
    return {
      error: error.message
    }
  }*/
  
  
  /*const menuItems = []
  menu.forEach(item => {
    menuItems.push({
      id: item.id,
      ...item.data()
    })
  })*/

  //const newMenutItems = await readDocument(menuItems)

  /*const menuData = await menuItems.get()

  let testArray = []
  menuData.forEach(item => {
    testArray.push({
      id: item.id,
      ...item.data()
    })
  })*/