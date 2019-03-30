import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const Container = styled.div`
  display: ${({ loading }) => (loading ? 'flex' : 'none')};
  position: ${({ fullscreen }) => (fullscreen ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 0.75);
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Spiner = styled.div``;

const Heart = styled(({ className }) => <div className={className} />)`
  width: 50px;
  height: 45px;
  display: inline-block;
  opacity: 0.8;

  &::before, &::after {
    content: "";
    position: absolute;
    left: 25px;
    top: 0;
    width: 25px;
    height: 40px;
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;

    ${({ min }) => !min && `
      @media screen and (min-width: 720px) {
        width: 45px;
        height: 70px;
        left: 45px;
      }
    `}
  }

  ${({ min }) => !min && `
    @media screen and (min-width: 720px) {
      width: 90px;
    }
  `}

  &::after {
    left: 0;
    transform-origin: 100% 100%;
    transform: rotate(45deg);
  }

  animation: bouncedelay 1.4s infinite ease-in-out;
  animation-fill-mode: both;

  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
    }

    40% {
      transform: scale(1.0);
    }
  }
`;

const Loader = ({
  fullscreen,
  loading,
  theme,
  min,
}) => (
  <Container fullscreen={fullscreen} loading={loading}>
    <Spiner>
      <Heart theme={theme} min={min} />
      <Heart theme={theme} min={min} />
      <Heart theme={theme} min={min} />
    </Spiner>
  </Container>
);

Loader.defaultProps = {
  loading: true,
  fullscreen: false,
  min: false,
};

Loader.propTypes = {
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  fullscreen: PropTypes.bool,
  min: PropTypes.bool,
};

export default withTheme()(Loader);
