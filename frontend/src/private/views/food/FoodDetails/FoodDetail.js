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
import { getInventoriesAction } from '../../../../actions/inventoryActions';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

const secretFoodOptions = [
  {
    label: 'YES',
    value: 'YES'
  },
  {
    label: 'NO',
    value: 'NO'
  }
];

const FoodDetail = ({ food, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open : false,
    error : false,
    message : ""
  });

  const getData = () => {
    dispatch(getCategoriesAction());
    dispatch(getInventoriesAction());
  };

  const [values, setValues] = useState({
    name: '',
    category: {label: "", value: ""},
    reviews: [],
    ratingsQuantity: 0,
    ratingsAverage: 0,
    ingredient: [],
    preparationTime: 0,
    price: 0,
    secretFood: false,
    description: '',
    calorie: 0
  });

  const foodData = () => {
    setValues({
      ...values,
      name: food.name,
      category: { label: food.category.name, value: food.category._id  },
      reviews: food.reviews,
      ratingsQuantity: food.ratingsQuantity,
      ratingsAverage: food.ratingsAverage,
      preparationTime: food.preparationTime,
      price: food.price,
      secretFood: food.secretFood,
      description: food.description,
      ingredient: food.ingredient,
      calorie: food.calorie
    });
  };

  const foodUpdateData = useSelector((state) => state.foodUpdate);
  const { loading, error, success } = foodUpdateData;

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

  const deleteIngredient = (id) =>{
    if(values.ingredient.some(el=> el._id._id === id)) {
      console.log(id)
      const deleteIngredientInArray = values.ingredient.filter((el)=> el._id._id !== id);
      setValues({
        ...values,
        ingredient: deleteIngredientInArray

      })
      setSnackbar({
        ...snackbar,
        open: true,
        error: true,
        message : "Ingredient Deleted"
      });
    }
  }

  const handleSelectCategory = (selectedValue) => {
    setValues({
      ...values,
      category: { label :selectedValue.label,  value : selectedValue.value }
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


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectInventory = (selectedValue) => {
    setValues({
      ...values,
      ingredientId: selectedValue.value,
      ingredientName : selectedValue.label
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
        navigate(`/business/foods`);
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
    foodData();
  }, [food]);

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const post = {
      name: values.name,
      category: values.category.value,
      ingredient: values.ingredient,
      preparationTime: values.preparationTime,
      price: values.price,
      secretFood: values.secretFood,
      description: values.description,
      calorie: values.calorie
    }
    await dispatch(updateFoodAction(food._id,post))
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
      {!food ? (
        <h1>Loading</h1>
      ) : (
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Category"
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
                  disabled
                  label="Ratings Average"
                  name="ratingsAverage"
                  onChange={handleChange}
                  required
                  value={values.ratingsAverage || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  disabled
                  label="Ratings Quantity"
                  name="ratingsQuantity"
                  onChange={handleChange}
                  required
                  value={values.ratingsQuantity || 0}
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
                  label="Reviews"
                  name="reviews"
                  onChange={handleChange}
                  required
                  value={values.reviews || ''}
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
                <TextField
                  fullWidth
                  label="Secret Category"
                  name="secretFood"
                  onChange={(e)=> {
                    e.preventDefault();
                    setValues({
                      ...values,
                      secretFood: !!'YES'
                    })
                  }}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.secretFood ? 'YES' : 'NO'}
                  variant="outlined"
                >
                  {secretFoodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={categorySelectArray}
                  placeholder={'Select Category'}
                  value={values.category}
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
                {values.ingredient.length > 0 &&
                <TableContainer component={Paper} >
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
                        inventories.map((element)=> el._id !== null && el._id._id === element._id && (
                          <TableRow key={element._id}>
                            <TableCell>{element.name}</TableCell>
                            <TableCell>
                              {el.ingredientQuantity}
                            </TableCell>
                            <TableCell>
                              <Button
                                style={{
                                  backgroundColor: '#dc3545',
                                  color: 'white'
                                }}
                                variant="contained"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteIngredient(el._id._id)
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        )))}
                    </TableBody>
                  </Table>
                </TableContainer>
                }
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

FoodDetail.propTypes = {
  className: PropTypes.string
};

export default FoodDetail;
