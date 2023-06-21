import { ThemeProvider } from 'styled-components';
import defaultTheme from './assets/styles/themes/default';
import GlobalStyles from './assets/styles/global';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <h1>My Contacts</h1>
    </ThemeProvider>
  );
}

export default App;
