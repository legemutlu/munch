import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import './MenuItem.css';
import Spinner from "../../../global/Spinner/Spinner"

import { getFoodsAction } from '../../../actions/foodActions';

const MenuItem = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname.split('/')[1];

  const getFoodData = () => {
    dispatch(getFoodsAction());
  };

  const foodListData = useSelector(state => state.foodList);
  const {foods, loading }= foodListData;
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
      {!loading ?
        <>
      <Header
        name={path && path.toUpperCase()}
        addBasketButton={false}
        goBackButton={true}
        link="/menu"
      />
      <Row>
      {getFoodsByCategorySlug.map(food => (
            <Col xl={6} align="center" key={food._id}>
              <div className="item">
                <div style={{ width: ' 60%', float: 'left', height: '100%' }}>
                  <div className="item-header">
                    <Link to={`/${path}/${food.slug}/${food._id}`}>
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
          ))}
      </Row>
        </> : <Spinner /> }
    </section>
  );
};

export default MenuItem;
