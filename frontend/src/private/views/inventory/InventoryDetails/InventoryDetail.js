import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  makeStyles,
  TextareaAutosize,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import { updateFoodAction } from '../../../../actions/foodActions';
import Snackbars from '../../../../global/Snackbar/Snackbars';
import Select from 'react-select';
import { getCategoriesAction } from '../../../../actions/categoryActions';
import { getInventoriesAction, updateInventoryAction } from '../../../../actions/inventoryActions';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));


const InventoryDetail = ({ inventory, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open : false,
    error : false,
    message : ""
  });

  const [values, setValues] = useState({
    name: '',
    category: "",
    quantity: 0,
    imageCover: "",
    unitPrice: 0,
  });

  const inventoryData = () => {
    setValues({
      ...values,
      name: inventory.name,
      category: inventory.category,
      quantity: inventory.quantity,
      imageCover: inventory.imageCover,
      unitPrice: inventory.unitPrice,
    });
  };

  const inventoryUpdateData = useSelector((state) => state.inventoryUpdate);
  const { loading, error, success } = inventoryUpdateData;

  const handleChange = event => {
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
        message: 'Inventory Updated!'
      });
      setTimeout(function () {
        navigate(`/business/inventories`);
      }, 3500);
    } else if (error) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: true,
        message: error
      });
    }
  }, [success, error]);



  useEffect(() => {
    inventoryData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateInventoryAction(inventory._id,values))
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
      {!inventory ? (
        <h1>Loading</h1>
      ) : (
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
      )}
    </form>
      </>
  );
};

InventoryDetail.propTypes = {
  className: PropTypes.string
};

export default InventoryDetail;
