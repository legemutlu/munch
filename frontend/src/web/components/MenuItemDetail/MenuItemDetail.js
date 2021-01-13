import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import burger from '../../images/RedDot_Burger.jpg';
import Snackbars from '../../../global/Snackbar/Snackbars';
import './MenuItemDetail.css';
import 'swiper/swiper.scss';

import { getFood } from '../../../actions/foodActions';
import { addToCart } from '../../../actions/cartActions';

const MenuItemDetail = () => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantiy] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split('/')[3];
  const backPath = location.pathname.split('/')[1];

  const getFoodData = () => {
    dispatch(getFood(path));
  };

  const food = useSelector(state => state.food.food);
  const user = useSelector(state => state.login);

  let foodData;
  if (food && food.data) {
    foodData = food.data;
  }

  const addItemHandler = id => {
    setQuantiy(quantity + 1);
    dispatch(addToCart(id, quantity));
    setOpen(true);
  };

  useEffect(() => {
    getFoodData();
  }, []);

  useEffect(() => {
    setTimeout(function() {
      setOpen(false);
    }, 1000);
  }, [open]);

  return (
    <section className="detail-page">
      <Snackbars
        open={open}
        error="false"
        message="Item Added to Cart"
      ></Snackbars>
      <Header
        name={foodData && foodData.name}
        addBasketButton={user.userInfo ? true : false}
        onClickAdd={e => {
          e.preventDefault();
          addItemHandler(foodData._id);
        }}
        goBackButton={true}
        link={`/${backPath}`}
      />
      {foodData && (
        <div className="detail-container">
          <Row>
            <Col md={8} lg={12} xl={4}>
              <Swiper slidesPerView={1}>
                <SwiperSlide>
                  <img className="menu-item-image" src={burger} alt={burger} />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="menu-item-image" src={burger} alt={burger} />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="menu-item-image" src={burger} alt={burger} />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="menu-item-image" src={burger} alt={burger} />
                </SwiperSlide>
                ...
              </Swiper>
            </Col>
            <Col>
              <div className="detail-description">
                <span>Description</span>
                <p>{foodData.description}</p>
              </div>
              <div className="detail-ingredient">
                <span className="ingredient">Ingredients</span>
                <Row>
                  {foodData.ingredient.map(el => (
                    <Col sm={12} md={12} lg={4} xl={4} key={el._id.id}>
                      <i className="fas fa-utensils"></i>
                      <span>{el._id.name}</span>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="detail-time-cal">
                <span style={{ marginRight: '25px' }}>
                  Preparation Time :{' '}
                  <span className="detail-time">
                    {foodData.preparationTime} min
                  </span>
                </span>
                <span>
                  Calorie :{' '}
                  <span className="detail-cal">{foodData.calorie} kcal</span>
                </span>
              </div>
              <div className="detail-price">
                Price :{' '}
                <span className="detail-price-val">{foodData.price} TL</span>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </section>
  );
};

export default MenuItemDetail;
