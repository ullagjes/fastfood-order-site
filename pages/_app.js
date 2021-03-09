import '../styles/globals.css'
import { AuthProvider } from '../config/auth'
import { Basket } from '../contexts/BasketContext'

function MyApp({ Component, pageProps }) {
  return (
      <Basket>
        <Component {...pageProps} />
      </Basket>
        
    
    )
}

export default MyApp
