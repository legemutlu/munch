import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { getUserDetails } from '../../../../actions/userActions';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerView = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const userID = location.pathname.split('/')[3];


  const getUserData = () => {
    dispatch(getUserDetails(userID));
  };

  const userDetail = useSelector(state => state.userDetails);
  const { user, loading } = userDetail;

  useEffect(()=>{
    getUserData();
  },[])


  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile userData={user && user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails userData={user && user} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CustomerView;
