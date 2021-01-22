import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Inventory from './Inventory';
import InventoryDetail from './InventoryDetail';
import { useLocation } from 'react-router-dom';
import { getFoodAction } from '../../../../actions/foodActions';
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryAction } from '../../../../actions/inventoryActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const InventoryDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const inventoryID = location.pathname.split('/')[3];

  const getInventoryData = () => {
    dispatch(getInventoryAction(inventoryID));
  };

  const inventoryDetails = useSelector((state) => state.inventoryDetails);
  const { inventory, loading, error } = inventoryDetails;

  useEffect(() => {
    getInventoryData();
  }, []);

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {loading === false && (
            <>
              <Grid item lg={4} md={6} xs={12}>
                <Inventory inventory={inventory} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <InventoryDetail inventory={inventory} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default InventoryDetails;
