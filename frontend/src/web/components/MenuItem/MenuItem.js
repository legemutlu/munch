import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import './MenuItem.css';
import burger from '../../images/RedDot_Burger.jpg';

import { getFoodsAction } from '../../../actions/foodActions';

const MenuItem = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname.split('/')[1];

  const getFoodData = () => {
    dispatch(getFoodsAction());
  };

  const foodListData = useSelector(state => state.foodList);
  const {foods}= foodListData;
  let getFoodsByCategorySlug = [];

  if (foods) {
    foods.map(
      el => el.category.slug === path && getFoodsByCategorySlug.push(el)
    );
  }

  useEffect(() => {
    getFoodData();
  }, []);

  return (
    <section className="menu-item-page">
      <Header
        name="menu-item"
        addBasketButton={false}
        goBackButton={true}
        link="/menu"
      />
      <Row>
        {getFoodsByCategorySlug &&
          getFoodsByCategorySlug.map(food => (
            <Col xl={6} align="center" key={food._id}>
              <div className="item">
                <div style={{ width: ' 60%', float: 'left', height: '100%' }}>
                  <div className="item-header">
                    <Link to={`/${path}/${food.slug}/${food._id}`}>
                      <span className="item-name">{food.name}</span>
                    </Link>
                    <i className="fas fa-star"></i>
                    <span className="item-rate">{food.ratingsAverage}</span>
                  </div>
                  <hr style={{ borderColor: 'white' }} />
                  <div className="item-description">{food.description}</div>
                </div>
                <div style={{ width: ' 40%', float: 'right', height: '100%' }}>
                  <div className="item-overlay"></div>
                  <img className="item-image" src={food.imageCover} />
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </section>
  );
};

export default MenuItem;
