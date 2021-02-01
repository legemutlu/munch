import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles, Snackbar
} from '@material-ui/core';
import Snackbars from '../../../global/Snackbar/Snackbars';
import { forgotPasswordAction } from '../../../actions/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(({
  root: {}
}));

const PasswordForgot = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });

  const [values, setValues] = useState({
    email: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (values) {
      try {
        dispatch(forgotPasswordAction(values));
        setSnackbar({
          ...snackbar,
          open: true,
          error: false,
          message: 'Mail Send!'
        });
        setTimeout(function () {
          setSnackbar({
            ...snackbar,
            open: false,
          });
          navigate(`/login`);
        }, 2000);
      }catch (e) {
        setSnackbar({
          ...snackbar,
          open: true,
          error: true,
          message: e
        });
      }
    }
  };

  return (
    <div style={{textAlign:'center'}}>
      <Snackbars
        open={snackbar.open}
        error={snackbar.error}
        message={snackbar.message}
      />
    <form
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={onSubmit}
    >
      <Card>
        <CardHeader
          subheader="Reset password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            label="Email"
            margin="normal"
            name="email"
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="center"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Reset
          </Button>
        </Box>
      </Card>
    </form>
    </div>
  );
};

PasswordForgot.propTypes = {
  className: PropTypes.string
};

export default PasswordForgot;