import '../styles/globals.css'
import { AuthProvider } from '../config/auth'
import { Basket } from '../contexts/BasketContext'
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Basket>
          <Component {...pageProps} />
        </Basket>
        </AuthProvider>
    </ThemeProvider>
    
      
        
    
    )
}

export default MyApp
