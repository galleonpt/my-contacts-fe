import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../../assets/styles/themes/default';
import GlobalStyles from '../../assets/styles/global';

import Router from '../../router';

import Header from '../Header/Header';
import ToastContainer from '../Toast/ToastContainer/ToastContainer';
import { Container } from './styles';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />

        <Container>
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
