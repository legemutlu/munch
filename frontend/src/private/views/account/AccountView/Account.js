import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deleteMeAction, updateMeAction } from '../../../../actions/userActions';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { logout } from '../../../../actions/authActions';
import { updateFoodAction } from '../../../../actions/foodActions';

const useStyles = makeStyles(() => ({
  root: {},
  input: {
    display: 'none'
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const Account = ({ userData, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: '', raw: '' });


  const handleChange = async (e) => {
    if (e.target.files.length) {
      console.log(e.target.files);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const deleteUserAccount = (event) => {
    event.preventDefault();
    dispatch(deleteMeAction());
    dispatch(logout());
    navigate(`/`, { replace: true });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.raw);
    await dispatch(updateMeAction(formData));
  };


  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          {image.preview ? (
            <Avatar src={image.preview} className={classes.avatar} />
          ) : (
            <Avatar
              className={classes.avatar}
              src={`/static/images/users/${userData.image}`}
            />
          )}
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userData.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {userData.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {image.preview && (
        <Box alignItems="center" display="flex" flexDirection="column">
          <Button
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              width: '25px',
              marginTop: '10px'
            }}
            onClick={handleUpload}
          >
            Save
          </Button>
        </Box>
      )}
      <CardActions>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file" style={{ width: '100%' }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component="span"
          >
            Upload Image
          </Button>
        </label>
      </CardActions>
      <CardActions>
        <Button
          style={{ backgroundColor: '#dc3545', color: 'white' }}
          fullWidth
          variant="contained"
          onClick={deleteUserAccount}
        >
          Delete Account
        </Button>
      </CardActions>
    </Card>
  );
};

Account.propTypes = {
  className: PropTypes.string
};

export default Account;
