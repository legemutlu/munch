import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  makeStyles,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow
} from '@material-ui/core';
import Snackbars from '../../../../global/Snackbar/Snackbars';
import { updateOrderAction } from '../../../../actions/orderActions';
import { UPDATE_ORDER_RESET } from '../../../../constants/orderConstants';
import Select from 'react-select';

const useStyles = makeStyles(() => ({
  root: {}
}));

const orderStatusOptions = [
  {
    label:'InQueue',
    value:'InQueue',
  },
  {
    label:  'Preparing',
    value:  'Preparing'
  },
  {
    label:  'Served',
    value:  'Served'
  },
  {
    label:  'Canceled',
    value:  'Canceled'
  }
]

const OrderDetails = ({ order, className, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });

  const [values, setValues] = useState({
    orderStatus: {
      label: "",
      value: ""
    },
    paymentStatus: '',
    foods: [],
    orderType: '',
    orderAddress: '',
    paymentMethod: '',
    description: '',
    userName: "",
    price: ''
  });

  const orderUpdateData = useSelector((state) => state.orderUpdate);
  const { loading, error, success: orderUpdate } = orderUpdateData;

  const orderData = () =>{
    if(order) {
      setValues({
        ...values,
        orderStatus: { label: order.orderStatus, value: order.orderStatus },
        paymentStatus: order.paymentStatus,
        foods: order.foods,
        orderType: order.orderType,
        orderAddress: order.orderAddress,
        paymentMethod: order.paymentMethod,
        description: order.description,
        userName: order.user.name,
        price: order.price
      });
    }
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectOrderStatus = (selectedValue) => {
    setValues({
      ...values,
      orderStatus: { label: selectedValue.label, value: selectedValue.value }
    });
  };

  useEffect(() => {
    if (orderUpdate) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: false,
        message: 'Order Updated!'
      });
      setTimeout(function () {
        dispatch({ type: UPDATE_ORDER_RESET });
        navigate(`/business/orders`);
      }, 2000);
    } else if (error) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: true,
        message: error
      });
    }
  }, [orderUpdate, error]);

  const deleteFood = (id) => {
    console.log(id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const post = {
      orderStatus: values.orderStatus.label,
      paymentStatus: values.paymentStatus,
    }
    await dispatch(updateOrderAction(order._id, post));
  };

  useEffect(() => {
    orderData();
  }, [order]);

  return (
    <>
      <Snackbars
        open={snackbar.open}
        error={snackbar.error}
        message={snackbar.message}
      />

      <form
        onSubmit={onSubmit}
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        {!order ? (
          <h1>Loading</h1>
        ) : (
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Order"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    helperText="Please specify the first name"
                    label="User name"
                    name="userName"
                    onChange={handleChange}
                    required
                    value={values.userName || ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={orderStatusOptions}
                    placeholder={'Select Order Status'}
                    value={values.orderStatus}
                    onChange={handleSelectOrderStatus}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Payment Status"
                    name="paymentStatus"
                    onChange={handleChange}
                    required
                    value={values.paymentStatus || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Order Type"
                    name="orderType"
                    onChange={handleChange}
                    required
                    value={values.orderType || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Order Address"
                    name="orderAddress"
                    onChange={handleChange}
                    required
                    value={values.orderAddress || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Payment Method"
                    name="orderType"
                    onChange={handleChange}
                    required
                    value={values.paymentMethod || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    disabled
                    onChange={handleChange}
                    required
                    value={values.price || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Order Note"
                    name="description"
                    disabled
                    fullWidth
                    onChange={handleChange}
                    multiline={true}
                    rows={8}
                    variant="outlined"
                    required
                    defaultValue={values.description || ''}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  {values.foods && (
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Food Name</TableCell>
                            <TableCell>Food Price</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.foods.map((element) => (
                            <TableRow key={element._id}>
                              <TableCell>{element.food.name}</TableCell>
                              <TableCell>{element.food.price}</TableCell>
                              <TableCell>
                                <Button
                                  style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white'
                                  }}
                                  variant="contained"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteFood(element.food._id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </Box>
          </Card>
        )}
      </form>
    </>
  );
};

OrderDetails.propTypes = {
  className: PropTypes.string
};

export default OrderDetails;
