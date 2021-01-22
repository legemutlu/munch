import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  TextField,
  makeStyles
} from '@material-ui/core';
import { updateMeAction } from '../../../../actions/userActions';



const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = ({ userData, loading, className, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();


  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  const getUserData = () =>{
    setValues({
      ...values,
      firstName: userData.name,
      lastName: userData.surname,
      email: userData.email,
      role: userData.role,
      id: userData._id
    });
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    const updatedUser = {
      name: values.firstName,
      surname: values.lastName,
      email: values.email,
      role: values.role,
      id: values.id
    };
    await dispatch(updateMeAction(updatedUser));
    navigate(`/business`, { replace: true });
  }

  useEffect(()=>{
    getUserData();
  },[userData]);

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select Role"
                  name="role"
                  disabled={true}
                  onChange={handleChange}
                  required
                  SelectProps={{ native: true }}
                  value={values.role || ""}
                  variant="outlined"
                >
                </TextField>
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
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
