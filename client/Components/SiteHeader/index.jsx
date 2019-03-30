import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../logo.svg';

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

    @media screen and (max-width: 720px) {
        display: none;
    }
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

const handleClick = setAlertMessage => setAlertMessage('Данный функционал пока что не доступен, но будет реализован в ближайшее время');

const SiteHeader = ({ theme }) => {
  const [alertMessage, setAlertMessage] = React.useState('');
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
        <Button
          onClick={() => handleClick(setAlertMessage)}
        >
          <HeaderText
            variant="body1"
            color="textSecondary"
            inline
          >
            О нас
          </HeaderText>
        </Button>
        <Button onClick={() => handleClick(setAlertMessage)}>
          <HeaderText
            variant="body1"
            color="textSecondary"
            inline
          >
            Войти
          </HeaderText>
        </Button>
      </Menu>
      <Dialog open={showAlert}>
        <AlertMessage>
          {alertMessage}
        </AlertMessage>
        <DialogActions>
          <Button onClick={() => setAlertMessage('')}>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

SiteHeader.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme()(SiteHeader);
