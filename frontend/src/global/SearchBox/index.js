import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Search as SearchIcon } from 'react-feather';
import { InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { checkSimilarity } from './similarty-check';
import { getFoodsAction } from '../../actions/foodActions';
import { useDispatch, useSelector } from 'react-redux';

const SearchBox = () => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [foodsArr, setFoodsArr] = useState([])
  const [matchArr, setMatchArr] = useState([])
  const getFoodsData = () => {
    dispatch(getFoodsAction());
  };

  const foodsListData = useSelector(state => state.foodList);
  const { foods, loading } = foodsListData;

  console.log(foodsArr)

  const submitHandler = (e) => {
    e.preventDefault()
    checkSimilarity(keyword).then(el => {
        let arr = [];
        el.forEach(id => {
          foods.forEach(food => {
              if (food._id === id) {
                arr.push(food);
              }
            }
          );
        });
        setFoodsArr(arr);
      }
    )
  }

  useEffect(() => {
    getFoodsData();
  }, []);

  return (
    <TextField
      style={{
        width: "50%",
        position: "fixed",
        left: '50%',
        transform: 'translate(-50%)'
      }}
      name='searchQuery'
      onChange={(e) => setKeyword(e.target.value)}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon
              style={{cursor: 'pointer'}}
              fontSize="small"
              color="action"
              onClick={submitHandler}
            >
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        )
      }}
      placeholder="Search customer"
      variant="outlined"
    />
  )
}

export default SearchBox