import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Snackbars from '../../../global/Snackbar/Snackbars';
import './Cart.css';
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart
} from '../../../actions/cartActions';
import {checkSuggestion} from './suggestion';
import burger from '../../images/RedDot_Burger.jpg';
import { getTop5FoodsAction } from '../../../actions/foodActions';


const Cart = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [suggest, setSuggest] = useState()

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const topFoods = useSelector((state) => state.foodListTop5)
  const { top5Foods } = topFoods

  const removeItemHandler = id => {
    dispatch(removeFromCart(id));
    setOpen(true);
  };

  const decreaseItem = (id, qty) => {
    dispatch(decreaseQuantity(id, qty));
  };

  const increaseItem = (id, qty) => {
    dispatch(increaseQuantity(id, qty));
  };

  const clearItems = () => {
    dispatch(clearCart());
  };


  useEffect(()=>{
    if(cartItems.length > 0){
      dispatch(getTop5FoodsAction());
      checkSuggestion(cartItems).then(el => {
        if(el){
          setSuggest(el);
        }
      })
    }
  },[cartItems])


  return (
    <section className="cart-page">
      <Snackbars
        open={open}
        error="true"
        message="Item Delete From Cart"
      />
      <Header name="cart" addBasketButton={false} goBackButton={false} />
      <Row className="cart-row">
        <Col className="empty-col" />
        <Col className="cart-col">
          <div className="cart">
            {cartItems.length === 0 ? (
              <h1>Cart Is Empty</h1>
            ) : (
              <table className="cart-table">
                <tbody>
                  <tr>
                    <th>Food</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>
                      <button
                        className="delete-all-button"
                        onClick={e => {
                          e.preventDefault();
                          clearItems();
                        }}
                      >
                        Delete All
                      </button>
                    </th>
                  </tr>
                  {cartItems &&
                    cartItems.map(item => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td className="cart-quantity">
                          {item.quantity > 1 &&
                          <i
                            className="fas fa-minus"
                            onClick={e => {
                              e.preventDefault();
                              decreaseItem(item._id, item.quantity);
                            }}
                          />
                          }
                          <span className="cart-quantity-input">
                            {item.quantity}
                          </span>
                          <i
                            className="fas fa-plus"
                            onClick={e => {
                              e.preventDefault();
                              increaseItem(item._id, item.quantity);
                            }}
                          />
                        </td>
                        <td>{item.price * item.quantity} TL</td>
                        <td>
                          <i
                            className="far fa-times-circle"
                            onClick={e => {
                              e.preventDefault();
                              removeItemHandler(item._id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </Col>
        <Col className="cart-actions-col">
          {cartItems.length > 0 && (
            <Link to="/order">
              <button className="order-button">Order</button>
            </Link>
          )}
        </Col>
      </Row>
      <Row>
        {cartItems.length > 0 && suggest &&
          <Col sm={12} md={6} lg={4} xl={4} align="center" key={suggest._id}>
            <div className="menu-item-suggestion">
              <Link
                to={`/${suggest.category.slug}/${suggest.name  
                  .replace(/\s+/g, '-')
                  .toLowerCase()}/${suggest._id}`}
              >
                <div className="menu-item-overlay" />
                <img
                  className="menu-item-image"
                  src={`/static/images/foods/${suggest.imageCover}`}
                  alt={burger}
                />
              </Link>
            </div>
            <span className="menu-item-name">
              {suggest.name}
            </span>
          </Col>
        }
      </Row>
    <Row>
        {cartItems.length > 0 && top5Foods && top5Foods.map(el =>
          <Col sm={12} md={6} lg={4} xl={4} align="center" key={el._id}>
            <div className="menu-item-suggestion">
              <Link
                to={`/${el.category.slug}/${el.name
                  .replace(/\s+/g, '-')
                  .toLowerCase()}/${el._id}`}
              >
                <div className="menu-item-overlay" />
                <img
                  className="menu-item-image"
                  src={`/static/images/foods/${el.imageCover}`}
                  alt={el.category.name}
                />
              </Link>
            </div>
            <span className="menu-item-name">
              {el.name}
            </span>
          </Col>

        )
        }
      </Row>
    </section>
  );
};

export default Cart;
