import firebaseInstance from '../config/firebase'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'


export default function Home({ game, error }) {
  if(error !== undefined){
    return(
      <p>En feil har oppstått: {error}</p>
    )
  }

  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Hei jeg er Ulla</p>
          <p>Dette er et eksempel på layout</p>
        </section>
      </Layout>
      
      <pre>
        <code>
          {JSON.stringify(game, null, 2)}
        </code>
      </pre>
    </>
    
  )
}


Home.getInitialProps = async () => {
  try {
    const collection = await firebaseInstance.firestore().collection('games')
    const document = await collection.doc('2lL1dCtBgTPjAVT3unM0').get()

    if(document.exists !== true) {
      throw new Error('Dokumentet finnes ikke.')
    }

    const game = {
      id: document.id,
      ...document.data()
    }

    return { game }
  } catch (error) {
    return {
      error: error.message
    }
  }


}

