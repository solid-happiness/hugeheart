import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Container = styled.div``;

const Item = styled.div`
  width: 300px;
  height: 300px;
  border: 1px #484848 dashed;
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

const Title = styled.header`
  color: white;
  font-weight: bold;
  font-family: "Amatic SC";
  font-size: 3rem;
  text-align: center;
`;

const Events = ({ theme, events, history }) => (
  <Container>
    {events.map(({
      id,
      name,
      photo,
      slug,
    }) => (
      <Item
        icon={photo}
        alt={name}
        key={id}
        color={theme.palette.secondary.main}
      >
        <Title>
          {name}
        </Title>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/${slug}/`)}
        >
            Подробнее
        </Button>
      </Item>
    ))}
  </Container>
);

Events.propTypes = {
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};

export default withRouter(withTheme()(Events));
