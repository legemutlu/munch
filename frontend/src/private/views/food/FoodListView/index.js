import React, { useState, useEffect } from 'react';
import Select from "react-select"
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { getCategories } from '../../../../actions/categoryActions';

const useStyles = makeStyles(theme => ({
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
    topCategory : [],
    category: [],
    selectedTopCategory: "",
    selectedCategory: ""
  })

  const getCategoriesData = () => {
    dispatch(getCategories());
  };

  const categoriesData = useSelector(state => state.category.categories);
  const { data, result, status } = categoriesData;

  let newArrayTopCategory = [];
  if (data) {
    const map = new Map();
    for (const item in data) {
      if(data[item].foods.length > 0){
      if(!map.has(data[item].topCategory)){
        map.set(data[item].topCategory, true)
        newArrayTopCategory.push({
          label: data[item].topCategory,
          value: data[item].topCategory
        })
      }
      }
    }
  }

  const handleSelectedTopCategory = selectedValue => {
    console.log(selectedValue)
    if(data && selectedValue) {
        const categoryArray = [];
        data.map(element => {
          if (selectedValue.label === element.topCategory && element.foods.length>0) {
            categoryArray.push({
              label:element.name,
              value: element._id,
            })
          }
        });
        setSelectState({
          ...selectState,
          category: categoryArray,
          selectedTopCategory: selectedValue
        });
      }

  }

  const handleSelectedCategory = selectedValue => {
    setSelectState({
      ...selectState,
      selectedCategory: selectedValue
    })
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar categories={data} />
        <Grid container>
        <Grid container item xs={3}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={newArrayTopCategory}
            placeholder={'Select Top Category'}
            onChange={handleSelectedTopCategory}
          >
          </Select>
        </Grid>
          <Grid container item xs={3}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={selectState.category}
            placeholder={'Select Category'}
            onChange={handleSelectedCategory}
          >
          </Select>
        </Grid>
        </Grid>
        <Box mt={3}>
          <Results categorySelected={selectState.selectedCategory}/>
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
