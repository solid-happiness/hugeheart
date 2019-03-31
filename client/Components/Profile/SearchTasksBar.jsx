import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import MenuItemMaterialUI from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import PaperMaterialUi from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import naturalCompare from 'string-natural-compare';
import Loader from '../Loader';

const Paper = styled(PaperMaterialUi)`
    && {
        max-height: 300px;
        overflow: scroll;
    }

    @media only screen and (max-width: 768px) {
        && {
            max-height: 100px;
        }
    }
`;

const AutosuggestAdapter = ({ className, ...rest }) => (
  <Autosuggest
    className={className}
    {...rest}
    theme={{
      container: `${className}__container`,
      suggestionsList: `${className}__suggestionsList`,
      suggestionsContainerOpen: `${className}__suggestionsContainerOpen`,
    }}
  />
);

AutosuggestAdapter.propTypes = {
  className: PropTypes.string.isRequired,
};

const StyledAutosuggest = styled(AutosuggestAdapter)`
    &__container {
        position: relative;
    }

    &__suggestionsContainerOpen {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        margin-top: 5px;
    }

    &__suggestionsList {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
`;

const MenuItem = styled(MenuItemMaterialUI)`
    && {
      margin-left: 10px;
    }

    @media only screen and (max-width: 768px) {
        max-height: 16px;
        font-size: 0.1rem;
    }
`;

const renderSearchInput = (inputProps) => {
  const { inputRef = () => {}, ref, ...rest } = inputProps;

  return (
    <TextField
      label="Поиск по названию"
      fullWidth
      variant="outlined"
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
      }}
      {...rest}
    />
  );
};

const getSuggestionValue = example => example.title;

const loadTasks = async ({
  query,
  setLoading,
  setTasks,
}) => {
  setLoading(true);
  const { tasks, query: loadedQuery } = await (await fetch(
    `/api/tasks/search/?query=${query}`,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )).json();

  tasks.sort((a, b) => naturalCompare(a.title, b.title));

  // В случае, если произошла гонка запросов (отправленный раньше пришёл самым последним),
  // то игнорируем его.
  if (query !== loadedQuery) {
    return;
  }

  setLoading(false);
  setTasks(tasks);
};


const handleTaskClick = (suggestion, history) => {
  const { id: taskId } = suggestion;
  history.push(
    `/task/${taskId}/`,
  );
};

const renderSuggestion = (history, suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.title, query);
  const parts = parse(suggestion.title, matches);

  return (
    <MenuItem
      selected={isHighlighted}
      component="div"
      onClick={() => handleTaskClick(suggestion, history)}
      disableGutters
    >
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 600 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
};

const onSuggestionsFetchRequested = ({ value, ...rest }) => {
  if (value.length < 2) {
    return;
  }

  loadTasks({ query: value, ...rest });
};

const SearchTasksBar = ({ history }) => {
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  const suggestionsPopperNode = React.useRef();

  return (
    <StyledAutosuggest
      suggestions={tasks}
      renderInputComponent={renderSearchInput}
      onSuggestionClick={suggestion => handleTaskClick(suggestion, history)}
      onSuggestionsFetchRequested={value => onSuggestionsFetchRequested({
        ...value,
        setTasks,
        setLoading,
      })}
      onSuggestionsClearRequested={() => setTasks([])}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={(...args) => renderSuggestion(history, ...args)}
      inputProps={{
        value: query,
        onChange: (event, { newValue }) => setQuery(newValue),
        placeholder: 'Начните вводить название примера...',
        inputRef: (node) => {
          suggestionsPopperNode.current = node;
        },
      }}
      renderSuggestionsContainer={options => (
        <Popper
          anchorEl={suggestionsPopperNode.current}
          open={loading || Boolean(options.children)}
        >
          <Paper
            square
            {...options.containerProps}
            style={{
              width: suggestionsPopperNode.current
                ? suggestionsPopperNode.current.clientWidth
                : null,
              position: 'relative',
            }}
          >
            <Loader loading={loading} />
            {!loading && options.children}
          </Paper>
        </Popper>
      )}
    />
  );
};

SearchTasksBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SearchTasksBar);
