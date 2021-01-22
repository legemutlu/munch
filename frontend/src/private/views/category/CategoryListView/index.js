import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import Result from './Result';

import { getCategoriesAction } from '../../../../actions/categoryActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectedValue: 'drinks',
  });

  const getCategoriesData = () => {
    dispatch(getCategoriesAction());
  };

  const categoryListData = useSelector((state) => state.categoryList);
  const { categories } = categoryListData;

  let uniqueTopCategory;
  if (categories) {
    uniqueTopCategory = [...new Set(categories.map((el) => el.topCategory))];
  }

  const handleChange = (event) => {
    event.preventDefault();
    setState({
      ...state,
      selectedValue: event.target.value
    });
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <Page className={classes.root} title="Categories">
      <Container maxWidth={false}>
        <Toolbar />
        <Select
          label="Select Category"
          variant="outlined"
          native
          value={state.selectedValue}
          onChange={handleChange}
        >
          {categories &&
            uniqueTopCategory.map((element) => (
              <option key={element} value={element}>
                {element.toUpperCase()}
              </option>
            ))}
        </Select>
        <Box mt={3}>
          <Result category={state.selectedValue} />
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
