import React from 'react';
import styled from 'styled-components';

import sleep from '../../helpers/sleep';
import Loader from '../Loader';
import Layout from '../Layout';
import Header from './Header';
import Cards from './Cards';
import MainSection from '../MainSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
    },
    {
      id: 2,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
    },
    {
      id: 3,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
    },
    {
      id: 4,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
    },
  ]);
};

const loadPartners = async (setEvents) => {
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
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
    },
    {
      id: 2,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
    },
    {
      id: 3,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
    },
    {
      id: 4,
      name: 'Выставка',
      img: '',
      slug: 'vystovka',
      shortDescription: 'hey hey hey',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, vero aliquam eveniet corporis ex perspiciatis earum, cumque unde molestiae laboriosam recusandae tempore doloremque provident labore hic pariatur modi, expedita autem?',
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

  const [partners, setPartners] = React.useState([]);
  React.useEffect(() => {
    loadPartners(setPartners);
  }, []);

  const loading = events.length === 0;

  return (
    <Layout>
      <Loader loading={loading} fullscreen />
      <Container>
        <Header />
        <MainSection>
          <Cards cards={events} title="События" />
          <Cards cards={partners} title="Партнёры" />
        </MainSection>
      </Container>
    </Layout>
  );
};

export default Home;
