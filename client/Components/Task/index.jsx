import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout';
import sleep from '../../helpers/sleep';
import Loader from '../Loader';
import MainSection from '../MainSection';
import TaskDescription from './TaskDescription';

const Container = styled.div`
    position: relative;
    max-width: 1200px;
    min-height: calc(100vh - 64px);
    margin: 45px auto;
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

const loadTask = async ({ id, setTask }) => {
  const partner = await (await fetch(`/api/tasks/${id}/`)).json();
  await sleep(1000);

  setTask(partner);
};

const Partner = ({ match }) => {
  const [task, setTask] = React.useState({});

  React.useEffect(() => {
    loadTask({
      id: match.params.taskId,
      setTask,
    });
  }, []);

  React.useEffect(() => {
    document.title = task.title;
  }, [task.title]);

  const loading = Object.keys(task).length === 0;

  return (
    <Layout>
      <Loader loading={loading} fullscreen />
      <MainSection>
        <Container>
          <BackLink to="/profile/">
            <Button>
              <BackIcon icon={faHandPointLeft} />
                К списку задач
            </Button>
          </BackLink>
          {!loading && <TaskDescription {...task} />}
        </Container>
      </MainSection>
    </Layout>
  );
};

Partner.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Partner;
