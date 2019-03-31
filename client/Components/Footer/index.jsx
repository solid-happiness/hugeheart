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
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  height: 150px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const Description = styled(Typography)`
  && {
    font-size: 0.9rem;
    color: white;
    padding: 0 15px;
    text-align: center;
  }

  @media screen and (max-width: 720px) {
    && {
      display: none;
    }
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
    display: block;
    min-width: 200px;
    font-family: "BloggerSansBold";
    color: white;
    font-size: 1rem;
    z-index: 999;
    position: relative;
  }

  @media screen and (max-width: 720px) {
    && {
      min-width: auto;
    }
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
    <Description>
        Федерация помощи Ольги Сергеенко «Огромное сердце»
        занимается помощью взрослым людям с онкологическими заболеваниями,
        оказывает консультационную, психологическую и юридическую поддержку.
    </Description>
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
