import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles, Button
} from '@material-ui/core';
import getInitials from '../../../utils/getInitials';

import {
  getFoodsAction,
  deleteFoodAction
} from '../../../../actions/foodActions';


const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({categorySelected, className, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();


  const getFoodsData = () => {
    dispatch(getFoodsAction());
  };

  const foodsListData = useSelector(state => state.foodList);
  const { foods, loading } = foodsListData;

  let newFoodArray = [];
  if(foods){
    foods.map(el => {
      if (el.category._id === categorySelected.value){
        newFoodArray.push(el)
      }
    })
  }

  useEffect(() => {
    getFoodsData();
  }, []);


  if(categorySelected){
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newFoodArray && newFoodArray.map(food => (
                      <TableRow
                        key={food._id}
                        hover
                      >
                        <TableCell>
                          <Box alignItems="center" display="flex">
                            <Avatar
                              className={classes.avatar}
                              src={`/static/images/foods/${food.imageCover}`}
                            >
                              {getInitials(food.name)}
                            </Avatar>
                            <Typography color="textPrimary" variant="body1">
                              {food.name.toUpperCase()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{food.category.name}</TableCell>
                        <TableCell>
                          {moment(food.createdAt).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                          <Button
                            style={{ backgroundColor: '#007bff', color: 'white' }}
                            variant="contained"
                            onClick={e => {
                              e.preventDefault();
                              navigate(`/business/foods/${food._id}`, { replace: true });
                            }}
                          >
                            Edit
                          </Button>{' '}
                          <Button
                            style={{ backgroundColor: '#dc3545', color: 'white' }}
                            variant="contained"
                            onClick={e => {
                              e.preventDefault();
                              dispatch(deleteFoodAction(food._id));
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
      </Card>
    );
  }else{
    return (<p style={{textAlign: "center",  textTransform: "uppercase", fontSize: "35px" }}>Please Select Category</p>);
  }
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
