import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import getInitials from '../../../utils/getInitials';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';

import FastfoodIcon from '@material-ui/icons/Fastfood';

import { deleteCategoryAction } from '../../../../actions/categoryActions';

const useStyles = makeStyles((theme) => ({
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

const Result = ({ className, category, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryListData = useSelector((state) => state.categoryList);
  const { categories, loading } = categoryListData;
  if (categories && typeof category !== 'undefined') {
    categories.map((el) => {
      if (el.topCategory === category) {
        return <p>el</p>;
      }
    });
  }

  if (typeof category !== 'undefined' && categories) {
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Top Category</TableCell>
                  <TableCell>Foods</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {categories.map(
                (element) =>
                  category === element.topCategory && (
                    <TableBody key={element._id}>
                      <TableRow hover>
                        <TableCell>
                          <Box alignItems="center" display="flex">
                            <Typography color="textPrimary" variant="body1">
                              {element.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{element.topCategory}</TableCell>
                        <TableCell>
                          <FastfoodIcon
                            className={classes.statsIcon}
                            color="action"
                          />
                          {element.foods.length} Foods
                        </TableCell>
                        <TableCell>
                          <img src={element.imageCover} />
                        </TableCell>
                        <TableCell>
                          <Button
                            style={{
                              backgroundColor: '#007bff',
                              color: 'white'
                            }}
                            variant="contained"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/business/categories/${element._id}`, {
                                replace: true
                              });
                            }}
                          >
                            Edit
                          </Button>{' '}
                          <Button
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white'
                            }}
                            variant="contained"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(deleteCategoryAction(element._id));
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )
              )}
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    );
  } else {
    return <p>Category not selected</p>;
  }
};

/* return (
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
};*/

Result.propTypes = {
  className: PropTypes.string,
  category: PropTypes.string.isRequired
};

export default Result;
