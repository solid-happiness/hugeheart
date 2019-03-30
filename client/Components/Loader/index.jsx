import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generate } from 'shortid';
import * as d3 from 'd3';
import _ from 'lodash';

const Container = styled.div`
  position: ${({ fullscreen }) => (fullscreen ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Domino = styled.div`
  display: inline-flex;
  width: 50px;
  height: 50px;
  margin: 25px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  transform: rotate(45deg);
  animation: domino-effect 2.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
  
  &::after {
    content: '';
    position: relative;
    top: 0;
    left: -70px;
    opacity: 0;
    width: 50px;
    height: 50px;
    animation: illusion 2.4s infinite ease-in-out;
    animation-delay: ${({ delay }) => delay}s;
    background-color: ${({ color }) => color};
    border-radius: 8px;
  }

  @media screen and (max-width: 480px) {
    width: 35px;
    height: 35px;
    margin: 15px;

    &::after {
      width: 35px;
      height: 35px;
      left: -45px;
    }
  }

  @keyframes domino-effect {
      20%, 100% {
          transform: rotate(135deg);
      }
  }

  @keyframes illusion {
      0%, 25% {
          opacity: 1;
      }

      26%, 100% {
          opacity: 0;
      }
  }
`;

const getColors = () => {
  const interpolator = d3.interpolate('#283583', '#EB5B49');
  return _.orderBy(
    [...new Array(4)].map(() => Math.random()),
    null,
    Math.random() < 0.5 ? 'asc' : 'desc',
  ).map(v => interpolator(v));
};

const Loader = ({ fullscreen, loading }) => {
  if (!loading) {
    return null;
  }

  const dominoes = getColors().map((color, idx) => ({
    color,
    id: generate(),
    delay: 0.6 * idx,
  }));

  return (
    <Container fullscreen={fullscreen}>
      {dominoes.map(domino => (
        <Domino key={domino.id} {...domino} />
      ))}
    </Container>
  );
};

Loader.defaultProps = {
  loading: true,
  fullscreen: false,
};

Loader.propTypes = {
  loading: PropTypes.bool,
  fullscreen: PropTypes.bool,
};

export default Loader;
