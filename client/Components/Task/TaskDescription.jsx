import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { getDate } from '../../helpers';
import Header from '../Header';

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
  comments,
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
    {Boolean(comments.length) && (
      <InteractionHistoryContainer>
        <Header>Комментарии</Header>
        <Communications>
          {comments.map(comment => (
            <InteractionHistoryElement key={comments.id}>
              <DescriptionBlock>
                <DescriptionTitle>Автор</DescriptionTitle>
                <Typography color="textSecondary" variant="body1" inline>
                  {comment.author}
                </Typography>
              </DescriptionBlock>
              <DescriptionBlock>
                <Typography color="textSecondary" variant="body1" inline>
                  {comment.commentText}
                </Typography>
              </DescriptionBlock>
              <DescriptionBlock>
                <DescriptionTitle>Время отправки комментария</DescriptionTitle>
                <Typography color="textSecondary" variant="body1" inline>
                  {getDate(comment.dateTimeCreate)}
                </Typography>
              </DescriptionBlock>
            </InteractionHistoryElement>
          ))}
        </Communications>
      </InteractionHistoryContainer>
    )}
  </>
);

TaskDescription.defaultProps = {
  shortDescription: '',
};

TaskDescription.propTypes = {
  title: PropTypes.string.isRequired,
  statusVerbose: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  eventTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  shortDescription: PropTypes.string,
  description: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

const styles = {
  title: {
    fontFamily: 'BloggerSansBold',
  },
};


export default withStyles(styles)(TaskDescription);
