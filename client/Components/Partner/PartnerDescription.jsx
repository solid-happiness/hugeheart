import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Header from '../Header';
import { getDate } from '../../helpers';

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

const DescriptionBlock = styled.div`
  margin: 15px;
`;

const DescriptionTitle = styled(Typography)`
  && {
    font-family: "BloggerSansBold";
    font-weight: 600;
    font-size: 1.4rem;
    margin-right: 10px;
  }
`;

const InteractionHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
`;

const Communications = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-row-gap: 15px;
  grid-column-gap: 25px;
  width: 90%;
`;

const InteractionHistoryElement = styled(Card)``;

const PartnerDescription = ({
  name,
  img,
  shortDescription,
  description,
  communicationPrefer,
  communicationAlternative,
  interactionHistory,
  classes,
}) => (
  <>
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
        subheader={shortDescription}
      />
      <CardMedia
        image={img}
        title={description}
        className={classes.media}
      />
      <CardContent>
        <Content color="textPrimary">{description}</Content>
        <DescriptionBlock>
          <DescriptionTitle color="textSecondary" variant="h6" inline>
          Предпочтительный способ связи:
          </DescriptionTitle>
          <Typography color="textSecondary" variant="body1" inline>
            {communicationPrefer}
          </Typography>
        </DescriptionBlock>
        <DescriptionBlock>
          <DescriptionTitle color="textSecondary" variant="h6" inline>
          Альтернативный способ связи:
          </DescriptionTitle>
          <Typography color="textSecondary" variant="body1" inline>
            {communicationAlternative}
          </Typography>
        </DescriptionBlock>
      </CardContent>
    </Container>
    <InteractionHistoryContainer>
      <Header>История взаимоотношения с партнёром</Header>
      <Communications>
        {interactionHistory.map(interaction => (
          <InteractionHistoryElement key={interaction.id}>
            <DescriptionBlock>
              <DescriptionTitle>Тема</DescriptionTitle>
              <Typography color="textSecondary" variant="body1" inline>
                {interaction.about}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle>Тип взаимодействия</DescriptionTitle>
              <Typography color="textSecondary" variant="body1" inline>
                {interaction.interactionLinkVerbose}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle>Время</DescriptionTitle>
              <Typography color="textSecondary" variant="body1" inline>
                {getDate(interaction.dateTime)}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle>Результат</DescriptionTitle>
              <Typography color="textSecondary" variant="body1" inline>
                {interaction.result}
              </Typography>
            </DescriptionBlock>
          </InteractionHistoryElement>
        ))}
      </Communications>
    </InteractionHistoryContainer>
  </>
);

PartnerDescription.defaultProps = {
  name: '',
  description: '',
  img: '',
};

PartnerDescription.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  shortDescription: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  communicationPrefer: PropTypes.string.isRequired,
  communicationAlternative: PropTypes.string.isRequired,
  interactionHistory: PropTypes.array.isRequired,
};

const styles = {
  title: {
    fontWeight: 500,
  },
  media: {
    paddingTop: '56.25%',
    backgroundSize: 'contain',
    margin: '0 35px',
  },
};

export default withStyles(styles)(PartnerDescription);
