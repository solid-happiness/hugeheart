import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';
import { useDropzone } from 'react-dropzone';

import { withStyles, withTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import File from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';

import shortid from 'shortid';

const styles = () => ({
  filesUploadingDropzone: {
    color: 'rgba(0, 0, 0, 0.5)',
    margin: '16px 16px 16px 0',
    position: 'relative',
    width: '200px',
    height: '200px',
    borderWidth: '2px',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderStyle: 'dashed',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:before': {
      content: '"+"',
      position: 'absolute',
      fontSize: '40px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.7)',
      borderColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
});

const handleDeleteFile = (idOfDeletingFile, props) => {
  const { files } = props;
  const filesWithoutDeleted = files.filter(({ id }) => id !== idOfDeletingFile);

  const { setFieldValue, name } = props;
  setFieldValue(name, filesWithoutDeleted, false);
};

const FileUploader = ({
  classes,
  files,
  name,
  setFieldValue,
}) => {
  const onDrop = React.useCallback((accepted) => {
    const acceptedFilesWithId = accepted.map(file => ({ file, id: shortid() }));

    setFieldValue(name, [...files, ...acceptedFilesWithId], false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <List>
        {files.map(({ id, file: { name: fileName, size } }) => (
          <ListItem key={id}>
            <ListItemAvatar>
              <Avatar>
                <File />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${fileName} (${filesize(size)})`}
            />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => handleDeleteFile(id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div {...getRootProps()} className={classes.filesUploadingDropzone}>
        <input {...getInputProps()} />
      </div>
    </>
  );
};

FileUploader.propTypes = {
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      error: PropTypes.shape({
        main: PropTypes.string,
      }),
    }),
  }).isRequired,
  classes: PropTypes.shape({
    filesUploadingDropzone: PropTypes.string,
  }).isRequired,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default withTheme()(
  withStyles(styles)(FileUploader),
);
