import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { getCategoriesAction } from '../../../../actions/categoryActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectState, setSelectState] = useState({
    topCategory: [],
    category: [],
    selectedTopCategory: '',
    selectedCategory: ''
  });

  const getCategoriesData = () => {
    dispatch(getCategoriesAction());
  };

  const categoryListData = useSelector((state) => state.categoryList);
  const { categories } = categoryListData;

  let newArrayTopCategory = [];
  if (categories) {
    const map = new Map();
    for (const item in categories) {
      if (categories[item].foods.length > 0) {
        if (!map.has(categories[item].topCategory)) {
          map.set(categories[item].topCategory, true);
          newArrayTopCategory.push({
            label: categories[item].topCategory,
            value: categories[item].topCategory
          });
        }
      }
    }
  }

  const handleSelectedTopCategory = (selectedValue) => {
    if (categories && selectedValue) {
      const categoryArray = [];
      categories.map((element) => {
        if (
          selectedValue.label === element.topCategory &&
          element.foods.length > 0
        ) {
          categoryArray.push({
            label: element.name,
            value: element._id
          });
        }
      });
      setSelectState({
        ...selectState,
        category: categoryArray,
        selectedTopCategory: selectedValue
      });
    }
  };

  const handleSelectedCategory = (selectedValue) => {
    setSelectState({
      ...selectState,
      selectedCategory: selectedValue
    });
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar />
        <Grid container>
          <Grid container item xs={3}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              options={newArrayTopCategory}
              placeholder={'Select Top Category'}
              onChange={handleSelectedTopCategory}
            />
          </Grid>
          <Grid container item xs={3}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              options={selectState.category}
              placeholder={'Select Category'}
              onChange={handleSelectedCategory}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Results categorySelected={selectState.selectedCategory} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
