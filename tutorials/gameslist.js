import firebaseInstance from '../config/firebase'

function GamesList({ games, error }) {

        async function sortGames(event) {
            event.preventDefault()
            const gamesLibrary = firebaseInstance.firestore().collection('games')
            const queryRef = await gamesLibrary.where('year', '==', 1995).get()
            if(queryRef.empty){
                console.log('No matching documents')
            }

            queryRef.forEach(doc => {
                console.log(doc.id, '=>', doc.data())
            })
    }

    return(
        <main>
            <h1>Mine favorittspill</h1>
            <ul>
                {games.map(item => {
                    return(
                        <li key={item.id}>
                            {JSON.stringify(item)}
                        </li>
                    )
                })}
            </ul>

            <button onClick={sortGames}>Sort</button>
        </main>
    )
}

//trengs for å hente data på server
//.get henter hele kolleksjonen
//...game henter et objekt med dataene slik de ser ut på det tidspunktet

GamesList.getInitialProps = async () => {
    try {
        const gamesCollection = await firebaseInstance.firestore().collection('games')
        const gamesData = await gamesCollection.get()
        
        let games = []
        gamesData.forEach(game => {
            games.push({
                id: game.id,
                ...game.data()
            })
        })

        return { games }
    } catch (error) {
        return {
            error: error.message
        }
    }
}

export default GamesList