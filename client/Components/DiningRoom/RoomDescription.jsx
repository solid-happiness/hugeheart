import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const Container = styled(Card)`
  && {
    width: 100%;
  }
`;

const Content = styled(Typography)`
    && {
        font-size: 1rem;
        font-family: "Lora", serif;
    }
`;

const RoomDescription = ({
  name,
  photo,
  description,
  classes,
  openTime,
  closeTime,
}) => (
  <Container>
    <CardHeader
      title={name}
      classes={{
        title: classes.title,
      }}
      titleTypographyProps={{
        color: 'secondary',
        variant: 'h6',
      }}
      subheader={`Время работы: ${openTime} - ${closeTime}`}
    />
    {photo && (
    <CardMedia
      image={photo}
      title={description}
      className={classes.media}
    />
    )}
    <CardContent>
      <Content color="textPrimary">{description}</Content>
    </CardContent>
  </Container>
);

RoomDescription.defaultProps = {
  name: '',
  description: '',
  photo: '',
  openTime: '',
  closeTime: '',
};

RoomDescription.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
  openTime: PropTypes.string,
  closeTime: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const styles = {
  title: {
    fontWeight: 500,
  },
  media: {
    padding: '120px',
  },
};

export default withStyles(styles)(RoomDescription);
