import firebaseInstance from '../../config/firebase'
import { useState } from 'react'
import InputBlock from '../../components/InputBlock'
function AddGame() {


    const [title, setTitle] = useState(null)
    const [rating, setrating] = useState(null)
    const [year, setYear] = useState(null)

    function handleTitleChange(event){
        setTitle(event.target.value)
    }

    function handleRatingChange(event){
        setrating(event.target.value)
    }

    function handleYearChange(event){
        setYear(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(title, rating, year)
        const collection = firebaseInstance.firestore().collection('games')
        collection.doc().set({
          title: title,
          rating: rating,
          year: year
        })
        .then(() => {
            console.log("lagt til")
        })
        .catch(error => {
            console.error(error)
        })  
        
    }
    
    return(
        <main>
            <h1>Legg til spill</h1>
            <form
                name="add-game"
                id="add-game"
                action="/"
                method="GET"
                onSubmit={event => handleSubmit(event)}
            >
                <InputBlock 
                    inputName="title"
                    inputId="title"
                    inputType="text"
                    inputPlaceholder="Spillets tittel"
                    labelText="Tittel"
                    inputChangeHandler={event => handleTitleChange(event)}
                />

                <InputBlock 
                    inputName="rating"
                    inputId="rating"
                    inputType="number"
                    labelText="Karakter"
                    inputChangeHandler={event => handleRatingChange(event)}
                />

                <InputBlock 
                    inputName="year"
                    inputId="year"
                    inputType="number"
                    labelText="Utgivelsesår"
                    inputChangeHandler={event => handleYearChange(event)}
                />

                <button type="submit">Submit</button>
            </form>
        </main>
    )

}

export default AddGame