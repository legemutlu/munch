import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import "./Search.css"
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../global/Spinner/Spinner';
import { InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { getFoodsAction } from '../../../actions/foodActions';
import { checkSimilarity } from '../../../global/SearchBox/similarty-check';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Search = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [foodsArr, setFoodsArr] = useState([]);
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
    <section className="contact-page">
      <Header name="search" addBasketButton={false} goBackButton={false} />
      <div className="search-box">
        <TextField
          style={{
            width: "50%",
            position: "absolute",
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
      </div>
      <Row style={{ marginTop:'85px'}}>
      {foodsArr.length > 0 && foodsArr.map(food=>
        <Col xl={6} align="center" key={food._id}>
          <div className="item">
            <div style={{ width: ' 60%', float: 'left', height: '100%' }}>
              <div className="item-header">
                <Link to={`/${food.category.slug}/${food.slug}/${food._id}`}>
                  <span className="item-name">{food.name}</span>
                </Link>
                <i className="fas fa-star" />
                <span className="item-rate">{food.ratingsAverage}</span>
              </div>
              <hr style={{ borderColor: 'white' }} />
              <div className="item-description">{food.description}</div>
            </div>
            <div style={{ width: ' 40%', float: 'right', height: '100%' }}>
              <div className="item-overlay"/>
              <img className="item-image" src={`/static/images/foods/${food.imageCover}`} />
            </div>
          </div>
        </Col>
      )}
      </Row>
    </section>
  );
}

export default Search;
