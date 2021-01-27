import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
  makeStyles,
  Button
} from '@material-ui/core';
import getInitials from '../../../utils/getInitials';

import { getOrdersAction } from '../../../../actions/orderActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const getOrdersData = () => {
    dispatch(getOrdersAction(limit, page + 1));
  };

  const getOrderData = (id) => {
    navigate(`/business/orders/${id}`, { replace: true });
  };

  const deleteOrder = (id) => {
    console.log(id);
  };

  useEffect(() => {
    getOrdersData();
  }, [limit, page]);

  const orderListData = useSelector((state) => state.orderList);
  const { orders, error, loading, length } = orderListData;
  console.log(orders);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.slice(0, limit).map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={`/static/images/users/${order.user.image}`}
                        >
                          {getInitials(order.user.name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {order.user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format('DD/MM/YYYY, h:mm:ss a')}
                    </TableCell>
                    <TableCell>
                      <Button
                        style={{ backgroundColor: '#007bff', color: 'white' }}
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          getOrderData(order._id);
                        }}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        style={{ backgroundColor: '#dc3545', color: 'white' }}
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteOrder(order._id);
                        }}
                      >
                        Delete
                      </Button>{' '}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length > 0 ? length : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
