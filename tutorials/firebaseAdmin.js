//import * as firebaseAdmin from 'firebase-admin'

/*if(!firebaseAdmin.apps.length){
    firebaseAdmin.initializeApp({
        credential:
            firebaseAdmin.credential.cert({
                //REGEX
                privateKey:process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
                clientEmail: process.env.CLIENT_EMAIL,
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID
            }),
            databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL
        
    })
}

export {firebaseAdmin}

//project settings - serviceaccounts - generate new private key. OBS! Superhemmelig verdi. Laste ned som fil. Åpne filen med viscode. 
//Kopier private key - lagre i env.local. 
//PRIVATE_KEY=Kopiert private key
//Kopier client email
//Lagre som CLIENT_EMAIL=Kopiert client email

//Start app på nytt når du har endret env-filen


for å implementere i page:

import {firebaseAdmin} from '../config/firebaseAdmin'
import nookies from 'nookies'

function Page ({uid, email}) {

    return(

    )
}

export const getServerSideProps = async(ctx) => {

    try {
        const cookies = nookies.get(ctx)
        const token = await firebaseAdmin.Auth().verifyIdToken(cookies.token)
        
        const db = firebaseAdmin.firestore()
        const snapshot = await db.collection('users).get()
        const users = []

        snapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            })
        })
 
        const {uid, email} = token

        return {
            props: { email, uid, users }
        }
    } catch(error) {
        console.log('Noe gikk galt')
        return {
            redirect: {
                permanent: false,
                destination: '/test'
            }
        }
    }

    

}

*/