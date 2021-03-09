import firebaseInstance from '../config/firebase'

function LikeList({ likes, error }) {

    
    return(
        <>
        <main>
            <ul>
                {console.log(likes)
                }
            </ul>
        </main>
           
        </>
    )
}

LikeList.getInitialProps = async () => {
    try {
        const likesCollection = await firebaseInstance.firestore().collection('ting jeg liker')
        const likesData = await likesCollection.get()
        

        let likes = []
        likesData.forEach(like => {
            likes.push({
                id: like.id,
                ...like.data()
            })
        })

        return { likes }
    } catch (error) {
        return {
            error: error.message
        }
    }
}



export default LikeList