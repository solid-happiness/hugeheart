import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SelectMaterialUI from '@material-ui/core/Select';
import CheckBox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormGroupControl from '../FormGroupControl';
import Loader from '../Loader';

const Select = styled(SelectMaterialUI)`
    && {
        width: 100%;
    }
`;

const Wrapper = styled(Grid)`
    position: relative;
`;

class AddTaskForm extends React.Component {
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
      events,
      avaliableUsers,
    } = this.props;

    return (
      <Wrapper container spacing={32}>
        <Loader loading={isSubmitting} min />
        <FormGroupControl
          label="Заголовок"
          name="title"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.title}
          error={errors.title}
          touched={touched.title}
        />
        <FormGroupControl
          label="Описание"
          name="description"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.description}
          error={errors.description}
          touched={touched.description}
        />
        <FormGroupControl
          label="Мероприятие"
          name="event"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.event}
          error={errors.event}
          touched={touched.event}
          render={props => (
            <Select
              {...props}
              value={values.event}
            >
              {events.map(avaliableEvent => (
                <MenuItem value={String(avaliableEvent.slug)} key={avaliableEvent.slug}>
                  {avaliableEvent.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormGroupControl
          label="Нужны ли ещё помощники"
          name="needPerformers"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.needPerformers}
          error={errors.needPerformers}
          touched={touched.needPerformers}
          render={(value, ...props) => (
            <CheckBox checked={values.value} {...props} />
          )}
        />
        <FormGroupControl
          label="Помощники"
          name="performers"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.performers}
          error={errors.performers}
          touched={touched.performers}
          render={props => (
            <Select
              {...props}
              value={values.performers}
              multiple
            >
              {avaliableUsers.map(avaliableUser => (
                <MenuItem value={String(avaliableUser.username)} key={avaliableUser.username}>
                  {avaliableUser.fullName}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormGroupControl
          label="Окончание задачи"
          name="deadline"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.deadline}
          error={errors.deadline}
          touched={touched.deadline}
          render={props => (
            <TextField
              id="date"
              label="Birthday"
              type="date"
              value={values.deadline}
              InputLabelProps={{
                shrink: true,
              }}
              {...props}
            />
          )}
        />
        <FormGroupControl
          label="Приоритет"
          name="priority"
          required
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.priority}
          error={errors.priority}
          touched={touched.priority}
          render={props => (
            <Select
              {...props}
              value={values.priority}
            >
              <MenuItem value="low">
                 Низкий
              </MenuItem>
              <MenuItem value="medium">
                 Средний
              </MenuItem>
              <MenuItem value="high">
                 Высокий
              </MenuItem>
            </Select>
          )}
        />
        <FormGroupControl
          label="Тэги"
          name="tags"
          handleBlur={handleBlur}
          handleChange={event => handleChange({
            target: {
              name: 'tags',
              value: event.target.value.split(' ').map(tag => tag.trim()),
            },
          })}
          value={values.tags.join(' ')}
          error={errors.tags}
          touched={touched.tags}
          multiline
        />
        <Grid container justify="center" item xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            disabled={!isValid || isSubmitting}
          >
            Добавить задачу
          </Button>
        </Grid>
      </Wrapper>
    );
  }
}

AddTaskForm.propTypes = {
  validateForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  avaliableUsers: PropTypes.array.isRequired,
};

export default AddTaskForm;
