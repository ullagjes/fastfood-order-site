import '../styles/globals.css'
import { AuthProvider } from '../config/auth'
import { Basket } from '../contexts/BasketContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Basket>
        <Component {...pageProps} />
      </Basket>
    </AuthProvider>
      
        
    
    )
}

export default MyApp
