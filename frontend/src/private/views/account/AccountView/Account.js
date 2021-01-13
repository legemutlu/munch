import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deleteMeAction } from '../../../../actions/userActions';

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

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Account = ({ userData,className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteUserAccount = (event) => {
    event.preventDefault();
    dispatch(deleteMeAction());
    dispatch(logout());
    navigate(`/`, { replace: true });
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={userData.image} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userData.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {userData.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="contained">
          Upload picture
        </Button>
        <Button style={{ backgroundColor: '#dc3545', color: 'white' }} fullWidth variant="contained" onClick={deleteUserAccount} >
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
