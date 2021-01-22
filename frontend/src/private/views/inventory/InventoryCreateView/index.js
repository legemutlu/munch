import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import clsx from 'clsx';
import { getCategoriesAction } from '../../../../actions/categoryActions';
import { createInventoryAction, getInventoriesAction } from '../../../../actions/inventoryActions';
import { createFoodAction } from '../../../../actions/foodActions';
import Select from 'react-select';

import { useNavigate } from 'react-router-dom';
import Snackbars from '../../../../global/Snackbar/Snackbars';

const useStyles = makeStyles(() => ({
  root: {}
}));

const InventoryCreate = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });

  const [values, setValues] = useState({
    name: '',
    category: "",
    quantity: 0,
    imageCover: "",
    unitPrice: 0,
  });


  const inventoryCreateData = useSelector((state) => state.inventoryCreate);
  const { loading, error, success } = inventoryCreateData;


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  useEffect(() => {
    if (success) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: false,
        message: 'Inventory Created!'
      });
      setTimeout(function () {
        navigate(`/business/inventories`);
      }, 2000);
    } else if (error) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: true,
        message: error
      });
    }
  }, [success, error]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createInventoryAction(values));
  };

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
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Inventory"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    onChange={handleChange}
                    required
                    value={values.category || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    onChange={handleChange}
                    required
                    value={values.quantity || 0}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Unit Price"
                    name="unitPrice"
                    onChange={handleChange}
                    required
                    value={values.unitPrice || ''}
                    variant="outlined"
                  />
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
      </form>
    </>
  );
};

export default InventoryCreate;
