import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withTheme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 15px;
  grid-row-gap: 25px;
  justify-items: center;
  margin: 25px;
  width: 100%;
`;

const Item = styled.div`
  width: 300px;
  height: 300px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 50%;
  overflow: hidden;
  background-image: ${({ icon }) => `url("${icon}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: centser;
  justify-content: space-between;
  padding: 18px 0 25px 0;
`;

const Description = styled(Typography)`
  && {
    text-transform: none;
    line-height: normal;
    max-width: 150px;
  }
`;

const Name = styled(Button)`
  && {
    background-color: #283583;
    text-transform: none;
  }
  
  &&:hover {
    background-color: #283583;
  }
`;

const Header = styled(Typography)`
  && {
    font-family: "BloggerSansBold";
    font-weight: 500;
    font-size: 2.5rem;
  }
`;

const Volunteers = ({ volunteers, theme }) => (
  <Wrapper>
    <Header color="primary">Лучшие волонтёры</Header>
    <Container>
      {volunteers.map(({
        id,
        name,
        img,
        shortDescription,
      }) => (
        <Item
          icon={img}
          alt={name}
          key={id}
          color={theme.palette.secondary.main}
        >
          <Name
            variant="contained"
            color="secondary"
          >
            {name}
          </Name>
          <Button
            variant="contained"
          >
            <Description>{shortDescription}</Description>
          </Button>
        </Item>
      ))}
    </Container>
  </Wrapper>
);

Volunteers.propTypes = {
  volunteers: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withTheme()(Volunteers));
