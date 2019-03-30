import React from 'react';
import styled from 'styled-components';

import sleep from '../../helpers/sleep';
import Loader from '../Loader';
import Layout from '../Layout';
import Header from './Header';
import Cards from './Cards';
import Volunteers from './Volunteers';
import MainSection from '../MainSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const loadEvents = async (setEvents) => {
  const { events } = await (await fetch('/api/events/')).json();
  setEvents(events);

  // Для красоты отображения loader-ов увеличиваем задержку на 1 секунду.
  await sleep(1000);
};

const loadPartners = async (setPartners) => {
  const { partners } = await (await fetch('/api/partners/')).json();
  setPartners(partners);

  await sleep(1000);
};

const loadVolunteers = async (setVolunteers) => {
  const { volunteers } = await (await fetch('/api/volunteers/')).json();
  setVolunteers(volunteers);

  await sleep(1000);
};

const Home = () => {
  React.useEffect(() => {
    document.title = 'Огромное сердце';
  }, []);

  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    loadEvents(setEvents);
  }, []);

  const [partners, setPartners] = React.useState([]);
  React.useEffect(() => {
    loadPartners(setPartners);
  }, []);

  const [volunteers, setVolunteers] = React.useState([]);
  React.useEffect(() => {
    loadVolunteers(setVolunteers);
  }, []);

  const loading = events.length === 0 || partners.length === 0 || volunteers.length === 0;

  return (
    <Layout>
      <Loader loading={loading} fullscreen />
      <Container>
        <Header />
        <MainSection>
          <Cards cards={events} title="События" />
          <Cards cards={partners} title="Партнёры" />
          <Volunteers volunteers={volunteers} />
        </MainSection>
      </Container>
    </Layout>
  );
};

export default Home;
