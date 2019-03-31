import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { withTheme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Header from '../../Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 15px;
  grid-row-gap: 25px;
  margin: 25px;
`;

const PartnerLink = styled(Link)`
  && {
    text-decoration: none;
  }
`;

const PartnerButton = styled(Button)`
  && {
    font-family: "BloggerSansBold";
    font-weight: 500;
    font-size: 1.1rem;
    padding: 10px 15px 5px 15px;
  }
`;

const Partners = ({
  partners,
  classes,
  user,
}) => (
  <Wrapper>
    <Header color="primary">Партнёры</Header>
    <Container>
      {partners.map(({
        id,
        slug,
        name,
        img,
        shortDescription,
      }) => (
        <Card key={id}>
          <CardHeader
            title={user.auth
              ? (
                <PartnerLink to={`/partners/${slug}/`}>
                  <PartnerButton variant="outlined" color="primary">
                    {name}
                  </PartnerButton>
                </PartnerLink>
              )
              : name
          }
            classes={{
              title: classes.title,
            }}
          />
          <CardMedia
            className={classes.media}
            image={img}
            title={name}
          />
          <CardContent>
            <Typography component="p">
              {shortDescription}
            </Typography>
          </CardContent>
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
  media: {
    paddingTop: '56.25%',
    backgroundSize: 'contain',
    margin: '0 20px',
  },
};

Partners.propTypes = {
  classes: PropTypes.object.isRequired,
  partners: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({ user });

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(withTheme()(Partners))),
);
