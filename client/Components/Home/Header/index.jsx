import React from 'react';
import styled from 'styled-components';
import background from './background.png';

const Container = styled.section`
  height: 300px;
  max-height: calc(100vh - 64px);
  margin: 128px 25px 0px 25px;
  background-image: url("${background}");
  background-size: contain;
  background-repeat: no-repeat;
  width: 80%;
  
  @media screen and (max-width: 720px) {
    width: 90%;
  }
`;

const Header = () => (
  <Container />
);

export default Header;
