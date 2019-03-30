import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../Loader';
import logo from '../../logo.svg';
import { setUserData } from '../../actions/user';
import { getCSRFToken } from '../../helpers';

const HeaderText = styled(({ main, ...rest }) => <Typography {...rest} />)`
  && {
    font-family: "BloggerSansBold";
    color: ${({ main }) => (main ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)')} ;
    font-weight: 500;
  }
`;

const Container = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background: rgb(250, 250, 250);
  z-index: 5;
  background-color: white;
  border-bottom: 1px solid rgba(0,0,0,.15);
  box-shadow: 0 1px 1px rgba(27,31,35,.1)!important;
`;

const HomePageLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.aside`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled(FontAwesomeIcon)`
  && {
    margin-right: 5px;
    background-image: url(${logo});
  }
`;

const Menu = styled.aside`
    display: flex;
    justify-content: space-between;
`;

const AlertMessage = styled(DialogContentText)`
    && {
      width: 350px;
      margin: 15px 25px 10px 25px;
      
      @media screen and (max-width: 480px) {
        width: 95%;
      }
    }
`;

const Content = styled(DialogContent)`
  && {
    padding-top: 15px;
    padding-bottom: 0;
  }

  && p {
    font-size: 1.3rem;
    font-weight: bold;
    font-family: "BloggerSansBold";
  }
`;

const TextInput = styled(TextField)`
  && {
    margin-top: 15px;
  }
`;

const Actions = styled(DialogActions)`
  && {
    width: 90%;
    margin: 25px 0 15px 0;
  }
`;

const AuthDialog = styled(({ className, showAuthAnimationFalse, ...rest }) => (
  <Dialog classes={{ paper: className }} {...rest} />
))`
  @keyframes shake {
    8%, 41% {
        transform: translateX(-10px);
    }
    25%, 58% {
        transform: translateX(10px);
    }
    75% {
        transform: translateX(-5px);
    }
    92% {
        transform: translateX(5px);
    }
    0%, 100% {
        transform: translateX(0);
    }
  }

  ${({ showAuthAnimationFalse }) => showAuthAnimationFalse && `
    animation: shake .5s linear;
  `}
`;

const DialogWrapper = styled.form`
  position: relative;
  min-height: 268px;
`;

const AboutUsButton = styled(Button)`
  && {
    margin-right: 15px;
  }

  @media screen and (max-width: 720px) {
    && {
      display: none;
      margin-right: 0;
    }
  }
`;

const UserProfileLink = styled(Link)`
  && {
    text-decoration: none;
  }
`;

const handleClick = setAlertMessage => setAlertMessage('Данный функционал пока что не доступен, но будет реализован в ближайшее время');
const handleAuthClick = async ({
  event,
  setShowAuthLoader,
  setShowAuthDialog,
  setShowAuthAnimation,
  dispatchUserData,
  username,
  password,
}) => {
  event.preventDefault();
  setShowAuthLoader(true);

  const { auth, ...authData } = await (await fetch(
    '/api/login/',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': getCSRFToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    },
  )).json();

  setShowAuthLoader(false);

  if (!auth) {
    setShowAuthAnimation(true);
    setInterval(() => setShowAuthAnimation(false), 600);
    return;
  }

  dispatchUserData({ auth, ...authData });
  setShowAuthDialog(false);
};

const SiteHeader = ({ theme, dispatchUserData, user }) => {
  const [alertMessage, setAlertMessage] = React.useState('');

  const [showAuthDialog, setShowAuthDialog] = React.useState(false);
  const [showAuthLoader, setShowAuthLoader] = React.useState(false);
  const [showAuthAnimationFalse, setShowAuthAnimation] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const showAlert = alertMessage !== '';

  return (
    <Container>
      <HomePageLink to="/">
        <Logo>
          <LogoIcon
            icon={faHeart}
            color={theme.palette.primary.main}
          />
          <HeaderText
            variant="h6"
            color="primary"
            main
          >
            Доброе сердце
          </HeaderText>
        </Logo>
      </HomePageLink>
      <Menu>
        {user.auth
          ? (
            <UserProfileLink to="/profile">
              <Button
                variant="outlined"
                color="primary"
              >
                Личный кабинет
              </Button>
            </UserProfileLink>
          )
          : (
            <>
              <AboutUsButton
                onClick={() => handleClick(setAlertMessage)}
              >
                О нас
              </AboutUsButton>
              <Button
                onClick={() => setShowAuthDialog(true)}
                variant="outlined"
                color="primary"
              >
                Войти
              </Button>
            </>
          )
      }
      </Menu>
      <Dialog open={showAlert}>
        <AlertMessage>
          {alertMessage}
        </AlertMessage>
        <DialogActions>
          <Button onClick={() => setAlertMessage('')}>OK</Button>
        </DialogActions>
      </Dialog>
      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        showAuthAnimationFalse={showAuthAnimationFalse}
      >
        <DialogWrapper
          action="/api/login"
          onSubmit={event => handleAuthClick({
            event,
            setShowAuthLoader,
            setShowAuthDialog,
            setShowAuthAnimation,
            dispatchUserData,
            username,
            password,
          })}
        >
          <Loader loading={showAuthLoader} min />
          <Content>
            <DialogContentText>
              Авторизоваться
            </DialogContentText>
            <TextInput
              autoFocus
              margin="dense"
              label="Логин"
              value={username}
              onChange={event => setUsername(event.target.value)}
              fullWidth
            />
            <TextInput
              label="Пароль"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              fullWidth
            />
          </Content>
          <Actions>
            <Button
              color="primary"
              variant="outlined"
              type="submit"
            >
              Войти
            </Button>
          </Actions>
        </DialogWrapper>
      </AuthDialog>
    </Container>
  );
};

SiteHeader.propTypes = {
  theme: PropTypes.object.isRequired,
  dispatchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  dispatchUserData: data => dispatch(setUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme()(SiteHeader),
);
