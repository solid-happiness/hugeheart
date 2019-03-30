import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import { faInstagram, faVk, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    height: 150px;
    margin-top: 50px;
    background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const Logo = styled.header`
    font-size: 4rem;
    font-family: "Amatic SC";

    @media screen and (max-width: 480px) {
        font-size: 3rem;
    }

    @media screen and (min-width: 1200px) {
        font-size: 5rem;
    }
`;

const IconWrapper = styled(FontAwesomeIcon)`
    && {
        display: block;
        width: 16px;
        height: 16px;
    }
`;

const ProfileLink = styled(Link)`
    && {
        color: white;
        font-family: "Amatic SC";
        font-size: 1.5rem;
    }
`;

const ProfileItem = styled(ListItem)`
    && {
        padding-top: 0;
        padding-bottom: 0;
    }
`;

const profiles = [
  {
    name: 'Alesin Alexander',
    link: 'https://www.instagram.com/sasha_alesin/',
    icon: faInstagram,
  },
  {
    name: 'Tumanov Ivan',
    link: 'https://vk.com/tia97',
    icon: faVk,
  },
  {
    name: 'Dmitry Chebakov',
    link: 'https://github.com/dchebakov',
    icon: faGithub,
  },
];

const Footer = ({ theme }) => (
  <Container
    theme={theme}
  >
    <Logo>ПОХАВАЙ!</Logo>
    <List>
      {profiles.map(({ name, icon, link }) => (
        <ProfileItem key={name}>
          <ListItemIcon>
            <IconWrapper icon={icon} />
          </ListItemIcon>
          <ListItemText>
            <ProfileLink href={link}>
              {name}
            </ProfileLink>
          </ListItemText>
        </ProfileItem>
      ))}
    </List>
  </Container>
);

Footer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme()(Footer);
