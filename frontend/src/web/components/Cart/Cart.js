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

const Cart = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

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

  return (
    <section className="cart-page">
      <Snackbars
        open={open}
        error="true"
        message="Item Delete From Cart"
      ></Snackbars>
      <Header name="cart" addBasketButton={false} goBackButton={false} />
      <Row className="cart-row">
        <Col className="empty-col"></Col>
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
                          <i
                            className="fas fa-minus"
                            onClick={e => {
                              e.preventDefault();
                              decreaseItem(item._id, item.quantity);
                            }}
                          ></i>
                          <span className="cart-quantity-input">
                            {item.quantity}
                          </span>
                          <i
                            className="fas fa-plus"
                            onClick={e => {
                              e.preventDefault();
                              increaseItem(item._id, item.quantity);
                            }}
                          ></i>
                        </td>
                        <td>{item.price * item.quantity} TL</td>
                        <td>
                          <i
                            className="far fa-times-circle"
                            onClick={e => {
                              e.preventDefault();
                              removeItemHandler(item._id);
                            }}
                          ></i>
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
    </section>
  );
};

export default Cart;
