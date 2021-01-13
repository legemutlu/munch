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
  makeStyles, TextareaAutosize
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const secretFoodOptions = [
  {
    label:"YES",
    value: "YES"
  },
  {
    label:"NO",
    value: "NO"
  }
]


const FoodDetail = ({ food ,className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    category: '',
    reviews: [],
    ratingsQuantity: 0,
    ratingsAverage:0,
    ingredient:[],
    preparationTime:0,
    price:0,
    secretFood: false,
    description: "",
    calorie:0
  });

  console.log(food)

  const foodData = () =>{
    if(typeof food !== 'undefined') {
      setValues({
        ...values,
        name: food.name,
        category: food.category.name,
        reviews: food.reviews,
        ratingsQuantity: food.ratingsQuantity,
        ratingsAverage: food.ratingsAverage,
        ingredient: food.ingredient,
        preparationTime: food.preparationTime,
        price: food.price,
        secretFood: food.secretFood,
        description: food.description,
        calorie: food.calorie
      });
    }
  }

  console.log(values)

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    foodData();
  }, [food]);

   const onSubmit = () => {

  }

  return (
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
          <CardHeader subheader="The information can be edited" title="Food" />
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
                  label="Ratings Average"
                  name="ratingsAverage"
                  onChange={handleChange}
                  required
                  value={values.ratingsAverage  || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Ratings Quantity"
                  name="ratingsQuantity"
                  onChange={handleChange}
                  required
                  value={values.ratingsQuantity  || 0}
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
                  value={values.price  || ''}
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
                  value={values.reviews  || ''}
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
                  value={values.preparationTime  || ''}
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
                  value={values.calorie  || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Secret Food"
                  name="secretFood"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.secretFood ? 'YES': 'NO'}
                  variant="outlined"
                >
                  {secretFoodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item md={6} xs={12}>
              {/*  <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.category || ''}
                  variant="outlined"
                >
                  {roles.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>*/}
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

FoodDetail.propTypes = {
  className: PropTypes.string
};

export default FoodDetail;
