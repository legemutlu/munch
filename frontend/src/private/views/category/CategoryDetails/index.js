import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Category from './Category';
import CategoryDetail from './CategoryDetail';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryAction } from '../../../../actions/categoryActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryID = location.pathname.split('/')[3];

  const getCategoryData = () => {
    dispatch(getCategoryAction(categoryID));
  };

  const categoryDetailsData = useSelector((state) => state.categoryDetails);
  const { category, loading } = categoryDetailsData;

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <Page className={classes.root} title="Category">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {loading === false && (
            <>
              <Grid item lg={4} md={6} xs={12}>
                <Category category={category} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <CategoryDetail category={category} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
