import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withTheme, withStyles } from '@material-ui/core';
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


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 55px 25px 25px 25px;
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

const Tasks = ({
  tasks,
  events,
  classes,
}) => {
  const [showEventsSelector, setShowSelector] = React.useState(true);
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState('');

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
      <Container>
        {tasks.map(({
          id,
          name,
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
            <CardContent>
              <Typography component="p">
                {description}
              </Typography>
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
    color: 'rgba(0, 0, 0, 0.70)',
  },
  media: {
    paddingTop: '56.25%',
  },
};

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
};

export default withRouter(
  withStyles(styles)(withTheme()(Tasks)),
);
