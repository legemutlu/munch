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
  TextField
} from '@material-ui/core';
import clsx from 'clsx';
import { createCategoryAction } from '../../../../actions/categoryActions';
import Select from 'react-select';

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
    label: 'desserts',
    value: 'desserts'
  }
];

const FoodCreate = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    imageCover: '',
    topCategory: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectTopCategory = (selectedValue) => {
    setValues({
      ...values,
      topCategory: selectedValue.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCategoryAction(values));
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
      <Card>
        <CardHeader title="Create Category" />
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
              <Select
                className="basic-single"
                classNamePrefix="select"
                options={topCategoryOptions}
                placeholder={'Select Top Category'}
                onChange={handleSelectTopCategory}
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
  );
};

export default FoodCreate;
