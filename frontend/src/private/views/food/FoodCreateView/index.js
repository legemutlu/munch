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
import { getInventoriesAction } from '../../../../actions/inventoryActions';
import { createFoodAction } from '../../../../actions/foodActions';
import Select from 'react-select';

import { useNavigate } from 'react-router-dom';
import Snackbars from '../../../../global/Snackbar/Snackbars';

const useStyles = makeStyles(() => ({
  root: {}
}));

const FoodCreate = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: '',
    category: '',
    ingredient: [],
    preparationTime: 0,
    price: 0,
    description: '',
    calorie: 0,
    ingredientQuantity: '',
    ingredientId: '',
    ingredientName: ''
  });

  const getData = () => {
    dispatch(getCategoriesAction());
    dispatch(getInventoriesAction());
  };

  const foodCreateData = useSelector((state) => state.foodCreate);
  const { loading, error, success } = foodCreateData;

  const inventoryListData = useSelector((state) => state.inventoryList);
  const { inventories } = inventoryListData;
  let inventorySelectArray = [];
  if (inventories.length > 0) {
    inventories.map((el) => {
      inventorySelectArray.push({
        label: el.name,
        value: el._id
      });
    });
  }

  const categoryData = useSelector((state) => state.categoryList);
  const { categories } = categoryData;
  let categorySelectArray = [];
  if (typeof categories !== 'undefined') {
    categories.map((el) =>
      categorySelectArray.push({
        label: el.name,
        value: el._id
      })
    );
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectCategory = (selectedValue) => {
    setValues({
      ...values,
      category: selectedValue.value
    });
  };

  const handleSelectInventory = (selectedValue) => {
    setValues({
      ...values,
      ingredientId: selectedValue.value,
      ingredientName: selectedValue.label
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    let ingredient = values.ingredient.slice(0);
    setOpen(false);
    ingredient.push({
      _id: values.ingredientId,
      ingredientQuantity: values.ingredientQuantity
    });
    setValues({
      ...values,
      ingredient: ingredient
    });
  };

  const deleteIngredient = (id) => {
    const updatedIngredient = values.ingredient.filter((el) => el._id !== id);
    setValues({
      ...values,
      ingredient: updatedIngredient
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (success) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: false,
        message: 'Food Created!'
      });
      setTimeout(function () {
        navigate(`/business/foods`);
      }, 2200);
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
    await dispatch(createFoodAction(values));
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
          <CardHeader subheader="The information can be edited" title="Inventory" />
          <CardActions>
            <Button color="primary" variant="text">
              Upload picture
            </Button>
          </CardActions>
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
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  required
                  value={values.price || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Preparation Time"
                  name="preparationTime"
                  onChange={handleChange}
                  required
                  value={values.preparationTime || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Calorie"
                  name="calorie"
                  onChange={handleChange}
                  required
                  value={values.calorie || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={categorySelectArray}
                  placeholder={'Select Category'}
                  onChange={handleSelectCategory}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Add Ingredient
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll="body"
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Add</DialogTitle>
                  <DialogContent dividers>
                    <DialogContentText>
                      To subscribe to this website, please enter your email
                      address here. We will send updates occasionally.
                    </DialogContentText>
                    <Select
                      options={inventorySelectArray}
                      placeholder={'Select Ingredient'}
                      onChange={handleSelectInventory}
                    />
                  </DialogContent>
                  <DialogContent>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="dense"
                      id="ingredientQuantity"
                      label="Ingredient Quantity"
                      type="number"
                      name="ingredientQuantity"
                      onChange={handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="description"
                  fullWidth
                  onChange={handleChange}
                  multiline={true}
                  rows={8}
                  variant="outlined"
                  required
                  defaultValue={values.description || ''}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {values.ingredient.length > 0 && (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Ingredient</TableCell>
                          <TableCell>Ingredient Quantity</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.ingredient.map((el) =>
                          inventories.map(
                            (element) =>
                              el._id === element._id && (
                                <TableRow key={element._id}>
                                  <TableCell>{element.name}</TableCell>
                                  <TableCell>{el.ingredientQuantity}</TableCell>
                                  <TableCell>
                                    <Button
                                      style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white'
                                      }}
                                      variant="contained"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        deleteIngredient(el._id);
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
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

export default FoodCreate;
