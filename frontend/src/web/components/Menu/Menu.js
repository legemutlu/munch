import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import './Menu.css';
import burger from '../../images/RedDot_Burger.jpg';

import { getCategoriesAction } from '../../../actions/categoryActions';

const Menu = () => {
  const dispatch = useDispatch();

  const getCategoryData = () => {
    dispatch(getCategoriesAction());
  };

  const categoryListData = useSelector((state) => state.categoryList);
  const { categories } = categoryListData;

  console.log(categories);

  let uniqueTopCategory;
  if (categories && categories.length > 0 ) {
    uniqueTopCategory = [...new Set(categories.map((el) =>
      el.foods.length > 0 && el.topCategory
    ))];
  }

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <section className="menu-page">
      <Header name="menu" addBasketButton={false} goBackButton={false} />
      {uniqueTopCategory &&
        uniqueTopCategory.map((el) => typeof el !== "boolean" && (
          <div key={el}>
            <h4 style={{ marginTop: '45px' }}>{el}</h4>
            <hr style={{ width: '50%', margin: '0 auto' }} />
            {categories &&
              categories.map(
                (category) =>
                  category.foods.length > 0 &&
                  el === category.topCategory && (
                    <Row key={category._id}>
                      <Col sm={12} md={6} lg={4} xl={4} align="center">
                        <div className="menu-item">
                          <Link
                            to={`/${category.name
                              .replace(/\s+/g, '-')
                              .toLowerCase()}`}
                          >
                            <div className="menu-item-overlay" />
                            <img
                              className="menu-item-image"
                              src={burger}
                              alt={burger}
                            />
                            <div className="menu-item-details fadeIn-top">
                              <h3>{category.name}</h3>
                            </div>
                          </Link>
                        </div>
                        <span className="menu-item-span">{category.name}</span>
                      </Col>
                    </Row>
                  )
              )}
          </div>
        ))}
    </section>
  );
};

export default Menu;
