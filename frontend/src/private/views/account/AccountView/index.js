import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../components/Page';
import Account from './Account';
import AccountDetails from './AccountDetails';
import { getMeAction } from '../../../../actions/userActions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AccountView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getCurrentUser = ()=>{
    dispatch(getMeAction())
  }

  const userDetail = useSelector(state => state.userDetails);
  const { user, loading } = userDetail;

  console.log(userDetail)

  useEffect(()=>{
    getCurrentUser();
  },[]);

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Account userData={user && user}/>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountDetails userData={user && user} loading={loading && loading}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AccountView;
