import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Layout from '../Layout';
import MainSection from '../MainSection';
import Loader from '../Loader';

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
  SET_PROFILE: 1,
};

const rooms = (state, action) => {
  switch (action.type) {
    case ROOM_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case ROOM_ACTIONS.SET_ROOM:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};


// eslint-disable-next-line no-unused-vars
const UserProfile = ({ match }) => {
  const [room] = React.useReducer(
    rooms,
    {
      loading: true,
      menu: [],
    },
  );


  React.useEffect(() => {
    document.title = room.name || 'Страница столовой';
  }, [room]);

  return (
    <Layout>
      <MainSection>
        <Container>
          <Loader fullscreen loading={room.loading} />
        </Container>
      </MainSection>
    </Layout>
  );
};

UserProfile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default UserProfile;
