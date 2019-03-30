import React from 'react';
import styled from 'styled-components';
import Layout from '../Layout';
import MainSection from '../MainSection';
import Loader from '../Loader';
import AddUserProfile from './AddUserProfile';

const Container = styled.div`
    position: relative;
    max-width: 1200px;
    min-height: calc(100vh - 64px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px;
`;

const ROOM_ACTIONS = {
  SET_LOADING: 0,
  SET_NEW_PROFILE: 1,
};

const rooms = (state, action) => {
  switch (action.type) {
    case ROOM_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case ROOM_ACTIONS.SET_NEW_PROFILE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const UserProfile = () => {
  const [room] = React.useReducer(
    rooms,
    {
      loading: false,
      menu: [],
    },
  );

  React.useEffect(() => {
    document.title = 'Личный кабинет';
  }, []);

  return (
    <Layout>
      <MainSection>
        <Container>
          <Loader fullscreen loading={room.loading} />
          <AddUserProfile />
        </Container>
      </MainSection>
    </Layout>
  );
};

export default UserProfile;
