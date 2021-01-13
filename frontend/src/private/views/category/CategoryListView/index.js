import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import CategoryCard from './CategoryCard';

import { getCategories } from '../../../../actions/categoryActions';

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
    selectedValue: 'all'
  });

  const getCategoriesData = () => {
    dispatch(getCategories());
  };

  const categoriesData = useSelector((state) => state.category.categories);
  const { data, result, status } = categoriesData;

  let uniqueTopCategory;
  if (data) {
    uniqueTopCategory = [...new Set(data.map((el) => el.topCategory))];
    uniqueTopCategory.unshift("all");
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
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Toolbar />
        <Select
          label="Select Category"
          variant="outlined"
          native
          value={state.selectedValue}
          onChange={handleChange}
        >
          {data &&
            uniqueTopCategory.map((element) => (
              <option key={element} value={element}>
                {element.toUpperCase()}
              </option>
            ))}
        </Select>
        {data && (
          <>
            <Box mt={3}>
              <Grid container spacing={3}>
                {data.map(
                  (element) =>
                    state.selectedValue !== 'all' ? element.topCategory === state.selectedValue && (
                        <Grid item key={element._id} lg={4} md={6} xs={12}>
                          <CategoryCard
                            className={classes.productCard}
                            element={element}
                          />
                        </Grid>
                      )
                    :
                    (
                      <Grid item key={element._id} lg={4} md={6} xs={12}>
                        <CategoryCard
                          className={classes.productCard}
                          element={element}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination color="primary" count={3} size="small" />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default ProductList;
