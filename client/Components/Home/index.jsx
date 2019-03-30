import React from 'react';
import styled from 'styled-components';

import sleep from '../../helpers/sleep';
import Loader from '../Loader';
import Layout from '../Layout';
import Header from './Header';
import Events from './Events';
import MainSection from '../MainSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const loadEvents = async (setEvents) => {
  /**
   * TODO: loadCompanies
   * const { companies } = await (await fetch('/api/companies/')).json();
   */

  // Для красоты отображения loader-ов увеличиваем задержку на 1 секунду.
  await sleep(1000);

  setEvents([
    {
      id: 1,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
    },
    {
      id: 2,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
    },
  ]);
};

const Home = () => {
  React.useEffect(() => {
    document.title = 'Огромное сердце';
  }, []);

  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    loadEvents(setEvents);
  }, []);

  const loading = events.length === 0;

  return (
    <Layout>
      <Loader loading={loading} fullscreen />
      <Container>
        <Header />
        <MainSection>
          <Events events={events} />
        </MainSection>
      </Container>
    </Layout>
  );
};

export default Home;
