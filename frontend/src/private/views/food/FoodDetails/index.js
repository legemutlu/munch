import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Food from './Food';
import FoodDetail from './FoodDetail';
import { useLocation } from 'react-router-dom';
import { getFoodAction } from '../../../../actions/foodActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const FoodIndex = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const foodID = location.pathname.split('/')[3];

  const getFoodsData = () => {
    dispatch(getFoodAction(foodID));
  };

  const foodDetailsData = useSelector((state) => state.foodDetails);
  const { food, loading } = foodDetailsData;

  useEffect(() => {
    getFoodsData();
  }, []);

  return (
    <Page className={classes.root} title="Foods">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {loading === false && (
            <>
              <Grid item lg={4} md={6} xs={12}>
                <Food food={food} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <FoodDetail food={food} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default FoodIndex;
