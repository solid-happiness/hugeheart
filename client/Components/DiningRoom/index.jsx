import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { generate } from 'shortid';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout';
import MainSection from '../MainSection';
import Loader from '../Loader';
import sleep from '../../helpers/sleep';
import RoomDescription from './RoomDescription';
import MenuGroup from './MenuGroup';
import Basket from './Basket';

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

const BackLink = styled(Link)`
    && {
        align-self: flex-start;
        text-decoration: none;
        margin-bottom: 20px;
    }
`;

const BackIcon = styled(FontAwesomeIcon)`
    && {
        margin-right: 10px;
    }
`;

const ROOM_ACTIONS = {
  SET_LOADING: 0,
  SET_ROOM: 1,
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

const loadRoom = async ({ slug, dispatch, setDishes }) => {
  dispatch({
    type: ROOM_ACTIONS.SET_LOADING,
    loading: true,
  });

  const loadedRoom = await (await fetch(`/api/eateries/${slug}/`)).json();
  await sleep(1000);

  dispatch({
    type: ROOM_ACTIONS.SET_ROOM,
    payload: loadedRoom,
  });

  dispatch({
    type: ROOM_ACTIONS.SET_LOADING,
    loading: false,
  });

  const selectedDishesIds = JSON.parse(
    window.localStorage.getItem(`room-${loadedRoom.id}`),
  ) || [];

  const dishes = loadedRoom.menu.reduce(
    (acc, group) => [...acc, ...group.dishes],
    [],
  );

  const selectedDishes = selectedDishesIds
    .map(dishId => dishes.find(dish => dish.id === dishId))
    .filter(Boolean)
    .map(dish => ({ ...dish, key: generate() }));

  setDishes(selectedDishes);
};

const saveSelectedDishesToLocalStorage = ({ room, selectedDishes }) => {
  window.localStorage.setItem(
    `room-${room.id}`,
    JSON.stringify(selectedDishes.map(dish => dish.id)),
  );
};

const DiningRoom = ({ match }) => {
  const [room, dispatch] = React.useReducer(
    rooms,
    {
      loading: true,
      menu: [],
    },
  );

  const [selectedDishes, setDishes] = React.useState([]);
  const addDishToCart = (dish) => {
    setDishes([...selectedDishes, { ...dish, key: generate() }]);
  };

  const [showCart, setShowCart] = React.useState(false);

  const { diningRoomSlug } = match.params;

  React.useEffect(() => {
    loadRoom({ slug: diningRoomSlug, dispatch, setDishes });
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      'beforeunload',
      () => saveSelectedDishesToLocalStorage({ room, selectedDishes }),
    );
  });

  React.useEffect(() => {
    document.title = room.name || 'Страница столовой';
  }, [room]);

  return (
    <Layout>
      <MainSection>
        <Container>
          <Loader fullscreen loading={room.loading} />
          <BackLink to="/">
            <Button>
              <BackIcon icon={faHandPointLeft} />
              К списку столовых
            </Button>
          </BackLink>
          <RoomDescription {...room} />
          {room.menu.map(menuGroup => (
            <MenuGroup
              key={menuGroup.id}
              menuGroup={menuGroup}
              addToCart={addDishToCart}
            />
          ))}
        </Container>
      </MainSection>
      <Basket
        selectedDishes={selectedDishes}
        setShowCart={setShowCart}
        onDelete={dishes => setDishes(dishes)}
        showCart={showCart}
        diningRoomName={room.name}
      />
    </Layout>
  );
};

DiningRoom.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DiningRoom;
