import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import AddUserForm from './AddUserForm';
import { getCSRFToken } from '../../helpers';
import Header from '../Header';

const getFormData = ({ photo, ...rest }) => {
  const formData = new FormData();

  Object.entries({ ...rest, location: window.location.href })
    .forEach(([key, value]) => formData.append(key, value));

  photo.forEach(({ file }) => formData.append(`file-${file.name}`, file, file.name));

  return formData;
};

const handleSubmitAddUser = async (values, actions, setAlertMessage) => {
  const data = getFormData(values);

  const response = await fetch(
    '/api/user-profile/create/',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': getCSRFToken(),
      },
      body: data,
    },
  );

  const { name, error } = await response.json();

  if (error) {
    setAlertMessage(error);
  } else {
    setAlertMessage(`${name} успешно добавлен!`);
  }

  actions.setSubmitting(false);
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 55px 25px 25px 25px;
  align-items: center;
`;

const SectionHeader = styled(Header)`
  && {
    margin-bottom: 20px;
  }
`;

const AddUserProfile = ({ user }) => {
  const [alertMessage, setAlertMessage] = React.useState('');

  if (user.role !== 'admin') {
    return null;
  }

  return (
    <Container>
      <SectionHeader color="primary">
       Добавить пользователя
      </SectionHeader>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          shortDescription: '',
          phoneNumber: '',
          role: '',
          photo: [],
        }}
        onSubmit={(...args) => handleSubmitAddUser(...args, setAlertMessage)}
        component={AddUserForm}
        validationSchema={yup.object().shape({
          username: yup.string().required(),
          email: yup.string().required().email(),
          password: yup.string().required(),
          firstName: yup.string().required(),
          lastName: yup.string().required(),
          shortDescription: yup.string(),
          phoneNumber: yup.string(),
          role: yup.string().required(),
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
            onClick={() => setAlertMessage('')}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

AddUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(({ user }) => ({ user }))(AddUserProfile);
