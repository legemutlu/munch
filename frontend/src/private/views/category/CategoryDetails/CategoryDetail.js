import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  CardActions,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { updateCategoryAction } from '../../../../actions/categoryActions';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

const topCategoryOptions = [
  {
    label: 'main',
    value: 'main'
  },
  {
    label: 'sides',
    value: 'sides'
  },
  {
    label: 'drinks',
    value: 'drinks'
  },
  {
    label: 'dessert',
    value: 'dessert'
  }
];

const CategoryDetail = ({ category, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    topCategory: '',
    imageCover: '',
    foods: []
  });

  const categoryData = () => {
    setValues({
      ...values,
      name: category.name,
      topCategory: category.topCategory.toLowerCase(),
      imageCover: category.imageCover,
      foods: category.foods
    });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    categoryData();
  }, [category]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateCategoryAction(category._id,values));
    navigate(`/business/categories`, { replace: true });

  };

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      {!category ? (
        <h1>Loading</h1>
      ) : (
        <Card>
          <CardHeader
            title="Category"
          />
          <CardActions>
            <Button color="primary" fullWidth variant="text">
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
                  label="Top Category"
                  name="topCategory"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.topCategory}
                  variant="outlined"
                >
                  {topCategoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>


              <Grid item md={6} xs={12}>
                {values.foods.length > 0 ?
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Food</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {values.foods.map((food) => (
                          <TableRow key={food}>
                            <TableCell>
                              {food}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>: <h6>There is no food in category</h6> }
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

CategoryDetail.propTypes = {
  className: PropTypes.string
};

export default CategoryDetail;
