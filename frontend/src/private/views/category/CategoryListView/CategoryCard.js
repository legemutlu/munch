import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';

import FastfoodIcon from '@material-ui/icons/Fastfood';

import { getCategory } from '../../../../actions/categoryActions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  success: {
    color: 'green'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CategoryCard = ({ className, element, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const setCategory = id => {
    dispatch(getCategory(id));
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar alt="Product" src={element.imageCover} variant="square" />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {element.name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          <Button
            style={{ backgroundColor: '#007bff', color: 'white' }}
            variant="contained"
            onClick={e => {
              e.preventDefault();
              setCategory(element._id);
            }}
          >
            Edit
          </Button>{' '}
          <Button
            style={{ backgroundColor: '#dc3545', color: 'white' }}
            variant="contained"
            onClick={e => {
              e.preventDefault();
              setCategory(element._id);
            }}
          >
            Delete
          </Button>
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <FastfoodIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {element.foods.length} Foods
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

CategoryCard.propTypes = {
  className: PropTypes.string,
  element: PropTypes.object.isRequired
};

export default CategoryCard;
