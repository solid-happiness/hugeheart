import React from 'react';
import styled from 'styled-components';
import Layout from '../Layout';
import MainSection from '../MainSection';
import Loader from '../Loader';
import AddUserProfile from './AddUserProfile';
import Tasks from './Tasks';
import sleep from '../../helpers/sleep';

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

const TASKS_ACTIONS = {
  SET_LOADING: 0,
  SET_DATA: 1,
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case TASKS_ACTIONS.SET_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const UserProfile = () => {
  React.useEffect(() => {
    document.title = 'Личный кабинет';
  }, []);

  const [{
    loading:
    tasksLoading,
    tasks,
    events,
    tags,
  }, dispatch] = React.useReducer(
    tasksReducer,
    {
      loading: false,
      tasks: [],
      events: [],
      tags: [],
    },
  );

  React.useEffect(() => {
    const loadTasks = async () => {
      dispatch({
        type: TASKS_ACTIONS.SET_LOADING,
        loading: true,
      });

      const loadedTasks = await (await fetch(
        '/api/tasks/',
        {
          method: 'GET',
          credentials: 'same-origin',
        },
      )).json();

      const loadedEvents = await (await fetch(
        '/api/events/',
        {
          method: 'GET',
          credentials: 'same-origin',
        },
      )).json();

      await sleep(1000);

      dispatch({
        type: TASKS_ACTIONS.SET_DATA,
        payload: loadedTasks,
      });

      dispatch({
        type: TASKS_ACTIONS.SET_DATA,
        payload: loadedEvents,
      });

      const loadedTags = [
        ...new Set(
          loadedTasks.tasks.reduce((acc, { tags: taskTags }) => [...acc, ...taskTags], []),
        ),
      ];

      dispatch({
        type: TASKS_ACTIONS.SET_DATA,
        payload: { tags: loadedTags },
      });

      dispatch({
        type: TASKS_ACTIONS.SET_LOADING,
        loading: false,
      });
    };

    loadTasks();
  }, []);

  return (
    <Layout>
      <MainSection>
        <Container>
          <Loader fullscreen loading={tasksLoading} />
          <Tasks tasks={tasks} events={events} tags={tags} />
          <AddUserProfile />
        </Container>
      </MainSection>
    </Layout>
  );
};

export default UserProfile;
