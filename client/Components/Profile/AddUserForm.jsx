import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SelectMaterialUI from '@material-ui/core/Select';
import FormGroupControl from '../FormGroupControl';
import FileUploader from '../FileUploader';
import Loader from '../Loader';

const Select = styled(SelectMaterialUI)`
    && {
        width: 100%;
    }
`;

const Wrapper = styled(Grid)`
    position: relative;
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
      setFieldValue,
    } = this.props;

    return (
      <Wrapper container spacing={32}>
        <Loader loading={isSubmitting} min />
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
          label="Email"
          name="email"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.email}
          error={errors.email}
          touched={touched.email}
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
        <FormGroupControl
          label="Краткое описание"
          name="shortDescription"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.shortDescription}
          error={errors.shortDescription}
          touched={touched.shortDescription}
        />
        <FormGroupControl
          label="Номер телефона"
          name="phoneNumber"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.phoneNumber}
          error={errors.phoneNumber}
          touched={touched.phoneNumber}
        />
        <FormGroupControl
          label="Роль"
          name="role"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.role}
          error={errors.role}
          touched={touched.role}
          required
          render={props => (
            <Select
              {...props}
              value={values.role}
            >
              {[
                {
                  name: 'volunteer',
                  verboseName: 'Волонтер',
                },
                {
                  name: 'organizer',
                  verboseName: 'Организатор',
                },
                {
                  name: 'admin',
                  verboseName: 'Администратор',
                },
              ].map(avaliableRole => (
                <MenuItem value={String(avaliableRole.name)} key={avaliableRole.name}>
                  {avaliableRole.verboseName}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormGroupControl
          label="Фотография"
          name="photo"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.photo}
          error={errors.photo}
          touched={touched.photo}
          render={() => (
            <FileUploader
              files={values.photo}
              setFieldValue={setFieldValue}
              name="photo"
              onBlur={handleBlur}
            />
          )}
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
  setFieldValue: PropTypes.func.isRequired,
};

export default AddUserForm;
