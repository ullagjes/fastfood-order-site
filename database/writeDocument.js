import firebaseInstance from 'firebase'
import readCollection from '../database/readCollection'

function writeDocument(event) {
    event.preventDefault()
    return ("hei")
    

}

export default writeDocument

/**const collection = readCollection(collection)
    collection.doc(id).set({
        object
    })
    .then(() => {
        console.log('suksess!')
    })
    .cathc(error => {
        console.error(error)
    }) */