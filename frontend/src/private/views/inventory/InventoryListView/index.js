import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { getInventoriesAction } from '../../../../actions/inventoryActions';

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
    ingredients: [],
    category: [],
    selectedCategory: ''
  });

  const getInventoriesData = () => {
    dispatch(getInventoriesAction());
  };

  const inventoryListData = useSelector((state) => state.inventoryList);
  const { inventories, error, loading } = inventoryListData;

  let newCategoryArray = [];
  if (inventories) {
    const map = new Map();
    for (const item in inventories) {
        if (!map.has(inventories[item].category)) {
          map.set(inventories[item].category, true);
          newCategoryArray.push({
            label: inventories[item].category.toUpperCase(),
            value: inventories[item].category
          });
        }
    }
  }

  const handleSelectedCategory = (selectedValue) => {
    setSelectState({
      ...selectState,
      selectedCategory: selectedValue
    });
  };

  let newIngredientsArray = [];
  if(selectState.selectedCategory.value !== ""){
    inventories.map(el => {
      if (el.category === selectState.selectedCategory.value){
        newIngredientsArray.push(el)
      }
    })
  }

  useEffect(() => {
    getInventoriesData();
  }, []);

  useEffect(() => {
   setSelectState({
     ...selectState,
     ingredients: newIngredientsArray
   })
  }, [inventories]);

  return (
    <Page className={classes.root} title="Inventories">
      <Container maxWidth={false}>
        <Toolbar />
        <Grid container>
          <Grid container item xs={3}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              options={newCategoryArray}
              placeholder={'Select Category'}
              onChange={handleSelectedCategory}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Results inventory={newIngredientsArray.length > 0 && newIngredientsArray} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
