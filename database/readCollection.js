import firebaseInstance from '../config/firebase';

async function readCollection(text) {

    const collection = await firebaseInstance.firestore().collection(text)
    const readCollection = await collection.get()

    const returnedArray = []
    
    readCollection.forEach(item => {
    returnedArray.push({
        id: item.id,
        ...item.data()

        })
    })
        
    return(returnedArray)
};

export default readCollection;