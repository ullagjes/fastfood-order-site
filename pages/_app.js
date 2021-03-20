
//CONTEXT
import { AuthProvider } from '../config/auth';
import { Basket } from '../contexts/BasketContext';

//STYLE
import { ThemeProvider } from 'styled-components';
import theme from '../utils/theme';
import GlobalStyle from '../styles/globalstyles';
import '../styles/fonts.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle /> 
        <AuthProvider>
          <Basket>
            <Component {...pageProps} />
          </Basket>
        </AuthProvider>
      </ThemeProvider>
    </>
    );
};

export default MyApp;