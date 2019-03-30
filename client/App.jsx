import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Home from './Components/Home';
import DiningRoom from './Components/DiningRoom';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Amatic+SC');
  @import url('https://fonts.googleapis.com/css?family=Lora');
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283583',
    },
    secondary: {
      main: '#EB5B49',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => {
  React.useEffect(() => {
    document.title = 'Огромное сердце';
  }, []);

  return (
    <>
      <CssBaseline />
      <GlobalStyles />
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route path="/" component={Home} exact />
          <Route path="/:diningRoomSlug/" component={DiningRoom} />
        </Router>
      </MuiThemeProvider>
    </>
  );
};

export default App;
