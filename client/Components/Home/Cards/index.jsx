import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withTheme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

const Header = styled(Typography)`
  && {
    font-family: "BloggerSansBold";
    font-weight: 500;
    color: rgba(0, 0, 0, 0.75);
    font-size: 2.5rem;
  }
`;

const Content = styled(CardContent)`
  && {
    padding-top: 250px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 15px;
  grid-row-gap: 25px;
  margin: 25px;
`;

const Cards = ({
  cards,
  classes,
  title,
}) => (
  <Wrapper>
    <Header>{title}</Header>
    <Container>
      {cards.map(({
        id,
        name,
        img,
        shortDescription,
        description,
      }) => (
        <Card key={id}>
          <CardHeader
            title={name}
            subheader={shortDescription}
            classes={{
              title: classes.title,
            }}
          />
          <CardMedia
            image={img}
            title={name}
          />
          <Content>
            <Typography component="p">
              {description}
            </Typography>
          </Content>
        </Card>
      ))}
    </Container>
  </Wrapper>
);

const styles = {
  title: {
    fontFamily: 'BloggerSansBold',
    color: 'rgba(0, 0, 0, 0.70)',
  },
};

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default withRouter(
  withStyles(styles)(withTheme()(Cards)),
);
