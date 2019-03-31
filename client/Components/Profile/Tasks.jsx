import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { withTheme, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabelMaterialUi from '@material-ui/core/InputLabel';
import OutlinedInputMaterialUi from '@material-ui/core/OutlinedInput';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import MenuItemMaterialUI from '@material-ui/core/MenuItem';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Header from '../Header';
import SearchTasksBar from './SearchTasksBar';
import { getDate } from '../../helpers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 55px 25px 25px 25px;
  width: 90%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 15px;
  grid-row-gap: 25px;
  margin: 25px;
`;

const OutlinedInput = styled(OutlinedInputMaterialUi)`
    && legend {
        border-bottom: none;
    }
`;

const InputLabel = styled(InputLabelMaterialUi)`
    && {
        font-size: 1.3rem;
    }
`;

const MenuItem = styled(MenuItemMaterialUI)`
    && {
        height: 15px;
        font-size: 1rem;
    }
`;

const EventsSelectorsContainer = styled.div`
    width: 100%;
`;

const ControlsBar = styled(Grid)`
  && {
    margin-top: 25px;
  }

  @media only screen and (max-width: 768px) {
    && {
        padding: 20px;
    }
  }
`;

const handleSearchButtonClick = ({
  showEventsSelector,
  setShowSelector,
  showSearchBar,
  setShowSearchBar,
}) => {
  setShowSearchBar(!showSearchBar);

  // Небольшая задержка перед пропаданием поисковой строки,
  // чтобы получилась красивая анимация.
  if (!showEventsSelector) {
    setTimeout(
      () => setShowSelector(true),
      350,
    );
  } else {
    setShowSelector(false);
  }
};

const TaskLink = styled(Link)`
  && {
    color: #2c348e;
    text-decoration: none;
  }
`;

const AdditionalInfo = styled.div`
  margin-top: 25px;
`;

const TagsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  width: 100%;
  grid-column-gap: 10px;
  grid-row-gap: 5px;
  margin-top: 15px;
`;

const TagButton = styled(({ selected, ...rest }) => <Button {...rest} />)`
  && {
    font-family: 'BloggerSansBold';
    color: ${({ selected }) => (selected ? '#fff' : '#2c348e')};
    background-color: ${({ selected }) => (selected ? '#2c348e' : '#fff')};
    border: 1px solid #2c348e;
    border-radius: 25px;
    padding: 0;
    text-transform: none;
  }

  ${({ selected }) => (selected && `
    &&:hover {
      background-color: #2c348e;
    }
  `)}
`;

const getFilteredTasks = (
  tasks,
  selectedTags,
  eventSlug,
) => {
  if (!selectedTags.length) {
    return tasks;
  }

  const eventFilteredTasks = eventSlug
    ? tasks.filter(({ tags }) => tags.includes(eventSlug))
    : tasks;

  const selectedTagsSet = new Set(selectedTags);
  return eventFilteredTasks.filter(({ tags: taskTags }) => taskTags.filter(
    taskTag => selectedTagsSet.has(taskTag),
  ).length > 0);
};

const Tasks = ({
  tasks,
  events,
  tags,
  classes,
}) => {
  const [showEventsSelector, setShowSelector] = React.useState(true);
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);

  return (
    <Wrapper>
      <Header color="primary">Доступные задачи</Header>
      <ControlsBar container justify="center" spacing={16}>
        <Grid item xs={10} sm={11}>
          <EventsSelectorsContainer>
            <Slide direction="left" in={showSearchBar} mountOnEnter unmountOnExit>
              <SearchTasksBar />
            </Slide>
            <FormControl
              variant="outlined"
              fullWidth
              style={{
                display: showEventsSelector ? 'block' : 'none',
              }}
            >
              <InputLabel>Выберите мероприятие</InputLabel>
              <Select
                fullWidth
                value={selectedEvent}
                input={(
                  <OutlinedInput
                    labelWidth={230}
                  />
                )}
                onChange={event => setSelectedEvent(event.target.value)}
              >
                {events.map(({ id, name, slug }) => (
                  <MenuItem
                    key={id}
                    value={slug}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </EventsSelectorsContainer>
        </Grid>
        <Grid item xs={2} sm={1}>
          <Fab
            color="secondary"
            aria-label="search"
            onClick={() => handleSearchButtonClick({
              showEventsSelector,
              setShowSelector,
              showSearchBar,
              setShowSearchBar,
            })}
          >
            {!showEventsSelector
            // Когда открыта панель поиска, то показываем крестик,
            // чтобы было интуитивно понятно, как выйти из режима поиска.
              ? <Close />
              : <Search />
            }
          </Fab>
        </Grid>
      </ControlsBar>
      <TagsContainer>
        {tags.map((tag) => {
          const selected = selectedTags.includes(tag);

          return (
            <TagButton
              selected={selected}
              key={tag}
              variant={selected ? 'contained' : 'outlined'}
              onClick={() => {
                if (selected) {
                  setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
                  return;
                }

                setSelectedTags([...selectedTags, tag]);
              }}
            >
              {tag}
            </TagButton>
          );
        })}
      </TagsContainer>
      <Container>
        {getFilteredTasks(
          tasks,
          selectedTags,
          selectedEvent,
        ).map(({
          id,
          title,
          shortDescription,
          description,
          statusVerbose,
          author,
          createDate,
          deadline,
          tags: taskTags,
          eventTitle,
        }) => (
          <Card key={id}>
            <CardHeader
              title={<TaskLink to={`/task/${id}/`}>{title}</TaskLink>}
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
                <Typography color="textSecondary">
                  {`Мероприятие: ${eventTitle}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Статус: ${statusVerbose}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Автор: ${author}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Дата создания: ${getDate(createDate)}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Дедлайн: ${getDate(deadline)}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Теги: ${taskTags.map(taskTag => `#${taskTag}`).join(', ')}`}
                </Typography>
              </AdditionalInfo>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Wrapper>
  );
};

const styles = {
  title: {
    fontFamily: 'BloggerSansBold',
  },
  media: {
    paddingTop: '56.25%',
  },
};

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default withRouter(
  withStyles(styles)(withTheme()(Tasks)),
);
