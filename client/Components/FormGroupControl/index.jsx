import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

const FormGroupControl = ({
  label,
  name,
  handleBlur,
  handleChange,
  error,
  touched,
  disabled,
  required,
  value,
  render,
  alignItems,
  showErrors,
}) => (
  <Grid item xs={12} container alignItems={alignItems} justify="center">
    <Grid item xs={12} sm={4} md={3}>
      <FormLabel
        error={Boolean(touched && error)}
        required={required}
      >
        {label}
      </FormLabel>
    </Grid>
    <Grid item xs={12} sm={8} md={6}>
      {render
        ? render({
          name,
          onBlur: handleBlur,
          onChange: handleChange,
          value,
        })
        : (
          <>
            {showErrors && Boolean(touched && error) && (
            <Typography color="error">{error}</Typography>
            )}
            <Input
              error={Boolean(touched && error)}
              name={name}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              disabled={disabled}
              value={value}
            />
          </>
        )
            }
    </Grid>
  </Grid>
);

FormGroupControl.defaultProps = {
  error: '',
  name: '',
  touched: false,
  handleChange: () => {},
  handleBlur: () => {},
  required: false,
  disabled: false,
  value: '',
  render: null,
  alignItems: 'center',
  showErrors: false,
};

FormGroupControl.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  name: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
  render: PropTypes.func,
  alignItems: PropTypes.string,
  showErrors: PropTypes.bool,
};

export default FormGroupControl;
