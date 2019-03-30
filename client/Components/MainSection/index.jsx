import styled from 'styled-components';

const MainSection = styled.section`
  flex: 1;
  padding: 64px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto;
  max-width: 1200px;
  
  @media screen and (max-width: 920px) {
    flex-direction: column;
  }
`;

export default MainSection;
