import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
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

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Inventory = ({ inventory, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {inventory &&
        <>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <img src={inventory.imageCover} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {inventory.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
        </>
      }
    </Card>
  );
};

Inventory.propTypes = {
  className: PropTypes.string
};

export default Inventory;
