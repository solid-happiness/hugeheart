import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroupControl from '../FormGroupControl';

const Wrapper = styled(Grid)`
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    z-index: 3;
`;

class AddUserForm extends React.Component {
  componentDidMount() {
    const { validateForm } = this.props;

    validateForm();
  }

  render() {
    const {
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      touched,
      errors,
      isValid,
      isSubmitting,
    } = this.props;

    return (
      <Wrapper container spacing={32}>
        <Overlay visible={isSubmitting}>
          <CircularProgress size={50} />
        </Overlay>
        <FormGroupControl
          label="Фамилия"
          name="lastName"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.lastName}
          error={errors.lastName}
          touched={touched.lastName}
        />
        <FormGroupControl
          label="Имя"
          name="firstName"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.firstName}
          error={errors.firstName}
          touched={touched.firstName}
        />
        <FormGroupControl
          label="Логин"
          name="username"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.username}
          error={errors.username}
          touched={touched.username}
        />
        <FormGroupControl
          label="Пароль"
          name="password"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.password}
          error={errors.password}
          touched={touched.password}
        />
        <Grid container justify="center" item xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            disabled={!isValid || isSubmitting}
          >
               Добавить пользователя
          </Button>
        </Grid>
      </Wrapper>
    );
  }
}

AddUserForm.propTypes = {
  validateForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  touched: PropTypes.shape({
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    username: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default AddUserForm;
