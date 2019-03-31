import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { generate } from 'shortid';
import AddTaskForm from './AddTaskForm';
import { getCSRFToken } from '../../helpers';
import Header from '../Header';

const handleSubmitAddTask = async (
  values,
  actions,
  setAlertMessage,
) => {
  const response = await fetch(
    '/api/tasks/create/',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': getCSRFToken(),
      },
      body: JSON.stringify(values),
    },
  );

  const { title, error } = await response.json();

  if (error) {
    setAlertMessage(error);
  } else {
    setAlertMessage(`Задача "${title}" успешно добавлена!`);
  }

  actions.setSubmitting(false);
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 25px 25px 25px;
  align-items: center;
  position: relative;
`;

const CloseButton = styled(IconButton)`
  && {
     position: absolute;
     top: -5px;
     right: -5px;
  }
`;

const CloseIcon = styled(FontAwesomeIcon)`
  && {
    width: 16px;
    height: 16px;
  }
`;

const SectionHeader = styled(Header)`
  && {
    margin-bottom: 20px;
  }
`;

const AddTaskButton = styled(Button)`
  && {
    position: fixed;
    right: 15px;
    bottom: 25px;
  }
`;

const AddTask = ({
  user,
  events,
  classes,
  setLoadingTasks,
}) => {
  const [alertMessage, setAlertMessage] = React.useState('');
  const [showAddForm, setShowAddForm] = React.useState(false);

  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const loadUsers = async () => {
      const { users: loadedUsers } = await (await fetch(
        '/api/tasks/users/',
        {
          method: 'GET',
          creditionals: 'same-origin',
        },
      )).json();

      setUsers(loadedUsers);
    };

    loadUsers();
  }, []);

  if (user.role !== 'admin' || user.length === 0) {
    return null;
  }

  return (
    <>
      <AddTaskButton
        variant="outlined"
        onClick={() => setShowAddForm(true)}
        color="primary"
      >
          Добавить задачу
      </AddTaskButton>
      <Drawer
        anchor="right"
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        classes={{
          paper: classes.rightPanel,
        }}
      >
        <Container>
          <CloseButton onClick={() => setShowAddForm(false)}>
            <CloseIcon icon={faTimes} />
          </CloseButton>
          <SectionHeader color="primary">
            Добавить задачу
          </SectionHeader>
          <Formik
            initialValues={{
              title: '',
              description: '',
              event: '',
              needPerformers: false,
              performers: [],
              deadline: '',
              priority: '',
              phoneNumber: '',
              level: '',
              tags: [],
            }}
            onSubmit={(...args) => handleSubmitAddTask(...args, setAlertMessage)}
            render={props => (
              <AddTaskForm
                events={events}
                avaliableUsers={users}
                {...props}
              />
            )}
            validationSchema={yup.object().shape({
              title: yup.string().required(),
              description: yup.string(),
              event: yup.string().required(),
              needPerformers: yup.bool(),
              deadline: yup.string().required(),
              priority: yup.string().required(),
              phoneNumber: yup.string(),
            })}
            isInitialValid={false}
          />
          <Dialog
            open={alertMessage !== ''}
            onClose={() => setAlertMessage('')}
          >
            <DialogContent>
              <DialogContentText>
                {alertMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setAlertMessage('');
                  setShowAddForm(false);
                  setLoadingTasks(generate());
                }}
                color="primary"
                autoFocus
              >
               OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Drawer>
    </>
  );
};

const styles = {
  rightPanel: {
    width: '80%',
  },
};

AddTask.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  setLoadingTasks: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({ user }))(withStyles(styles)(AddTask));
