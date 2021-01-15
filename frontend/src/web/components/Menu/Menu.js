import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import './Menu.css';
import burger from '../../images/RedDot_Burger.jpg';

import { getFoodsAction } from '../../../actions/foodActions';

const Menu = () => {
  const dispatch = useDispatch();

  const getFoodsData = () => {
    dispatch(getFoodsAction());
  };

  const foodListData = useSelector(state => state.foodList);
  const { foods } = foodListData;

  let uniqueCategory;
  if (foods && foods.length > 0) {
    const foodCategory = foods.map(food => food.category);
    uniqueCategory = [...new Set(foodCategory.map(el => el.name))];
  }

  useEffect(() => {
    getFoodsData();
  }, []);

  return (
    <section className="menu-page">
      <Header name="menu" addBasketButton={false} goBackButton={false} />
      <Row>
        {uniqueCategory &&
          uniqueCategory.map(category => (
            <Col sm={12} md={6} lg={4} xl={4} align="center" key={category}>
              <div className="menu-item">
                <Link to={`/${category.replace(/\s+/g, '-').toLowerCase()}`}>
                  <div className="menu-item-overlay"></div>
                  <img className="menu-item-image" src={burger} alt={burger} />
                  <div className="menu-item-details fadeIn-top">
                    <h3>{category}</h3>
                  </div>
                </Link>
              </div>
              <span className="menu-item-span">{category}</span>
            </Col>
          ))}
      </Row>
    </section>
  );
};

export default Menu;
