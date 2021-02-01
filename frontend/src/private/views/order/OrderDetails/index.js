import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import OrderDetails from './OrderDetails';
import { getOrderAction } from '../../../../actions/orderActions';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const OrderView = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const orderID = location.pathname.split('/')[3];


  const getUserData = () => {
    dispatch(getOrderAction(orderID));
  };

  const orderDetailsData = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetailsData;


  useEffect(()=>{
    getUserData();
  },[])


  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <OrderDetails order={loading === false && order} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default OrderView;
