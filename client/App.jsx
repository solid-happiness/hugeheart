import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { setUserData } from './actions/user';
import Home from './Components/Home';
import DiningRoom from './Components/DiningRoom';

import BloggerSansBoldEot from './fonts/BloggerSans-Bold.eot';
import BloggerSansBoldTtf from './fonts/BloggerSans-Bold.ttf';
import BloggerSansBoldWoff from './fonts/BloggerSans-Bold.woff';

import BloggerSansLightEot from './fonts/BloggerSans-Light.eot';
import BloggerSansLightTtf from './fonts/BloggerSans-Light.ttf';
import BloggerSansLightWoff from './fonts/BloggerSans-Light.woff';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Lora');

  @font-face {
    font-family: 'BloggerSansBold';
    src: url('${BloggerSansBoldEot}');
    src: url('${BloggerSansBoldTtf}') format('woff'),
    url('${BloggerSansBoldWoff}') format('truetype');
    font-style: normal;
    font-weight: bold;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: 'BloggerSans';
    src: url('${BloggerSansLightEot}');
    src: url('${BloggerSansLightTtf}') format('woff'),
         url('${BloggerSansLightWoff}') format('truetype');
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(150, 46, 43)',
    },
    secondary: {
      main: '#EB5B49',
    },
  },
  typography: {
    fontFamily: '"BloggerSansLight", Tahoma, Arial, Helvetica, sans-serif',
    fontSize: 16,
    useNextVariants: true,
  },
});

const App = ({
  dispatchUserData,
}) => {
  React.useEffect(() => {
    document.title = 'Огромное сердце';
  }, []);

  React.useEffect(() => {
    const loadUserData = async () => {
      const userData = await (await fetch(
        '/api/user-profile/',
        {
          method: 'GET',
          credentials: 'same-origin',
        },
      )).json();

      if (userData.auth) {
        dispatchUserData(userData);
      }
    };

    loadUserData();
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

App.propTypes = {
  dispatchUserData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  dispatchUserData: data => dispatch(setUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
