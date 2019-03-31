import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { getDate } from '../../helpers';

const Container = styled(Card)`
  && {
    width: 100%;
  }
`;

const DescriptionBlock = styled.div`
  margin: 15px;
`;

const DescriptionTitle = styled(Typography)`
  && {
    font-family: "BloggerSansBold";
    font-weight: 600;
    font-size: 1.2rem;
    margin-right: 10px;
  }
`;

const AdditionalInfo = styled.div`
  margin-top: 25px;
`;

const TaskDescription = ({
  title,
  shortDescription,
  description,
  statusVerbose,
  author,
  createDate,
  deadline,
  tags: taskTags,
  eventTitle,
  classes,
}) => (
  <>
    <Container>
      <Card>
        <CardHeader
          title={title}
          subheader={shortDescription}
          classes={{
            title: classes.title,
          }}
        />
        <CardContent>
          <Typography>
            {description}
          </Typography>
          <AdditionalInfo>
            <DescriptionBlock>
              <DescriptionTitle inline>Мероприятие:</DescriptionTitle>
              <Typography color="textSecondary" variant="body2" inline>
                {eventTitle}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle inline>Статус:</DescriptionTitle>
              <Typography color="textSecondary" variant="body2" inline>
                {statusVerbose}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle inline>Автор:</DescriptionTitle>
              <Typography color="textSecondary" variant="body2" inline>
                {author}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle inline>Дата создания:</DescriptionTitle>
              <Typography color="textSecondary" variant="body2" inline>
                {getDate(createDate)}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle inline>Дедлайн: </DescriptionTitle>
              <Typography color="textSecondary" variant="body2" inline>
                {getDate(deadline)}
              </Typography>
            </DescriptionBlock>
            <DescriptionBlock>
              <DescriptionTitle inline>Теги:</DescriptionTitle>
              <Typography color="textSecondary" variant="body2" inline>
                {taskTags.map(taskTag => `#${taskTag}`).join(', ')}
              </Typography>
            </DescriptionBlock>
          </AdditionalInfo>
        </CardContent>
      </Card>
    </Container>
  </>
);

TaskDescription.propTypes = {
  title: PropTypes.string.isRequired,
  statusVerbose: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  eventTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  shortDescription: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const styles = {
  title: {
    fontFamily: 'BloggerSansBold',
  },
};


export default withStyles(styles)(TaskDescription);
