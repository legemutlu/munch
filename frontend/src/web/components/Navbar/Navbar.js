import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import logo from '../../images/favicon.png';
import { logout } from '../../../actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const userLoginState = useSelector(state => state.login);
  const { userInfo } = userLoginState;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      {userInfo &&
        (userInfo.user.role === 'customer' ? (
          <div className="profile-item">
            <img
              style={{ width: '40px', padding: '0', marginRight: '0' }}
              src={logo}
              alt={logo}
            />
            <Link style={{ left: '0' }} to="/cart">
              Profile
            </Link>
          </div>
        ) : (
          <div className="profile-item">
            <Link style={{ left: '0' }} to="/business">
              Go to Business
            </Link>
          </div>
        ))}
      <img className="navbar-logo" src={logo} alt={logo} />
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-item" href="">
            Home
          </Link>
        </li>
        <li>
          <Link to="/menu" className="navbar-item" href="">
            Menu
          </Link>
        </li>
        <li>
          <Link to="/reservation" className="navbar-item" href="">
            Reservation
          </Link>
        </li>
        <li>
          <Link to="/contact" className="navbar-item" href="">
            Contact
          </Link>
        </li>
      </ul>
      <div className="navbar-cart">
        <Link className="navbar-cart-items" to="/cart">
          Cart
          <i className="fas fa-shopping-cart" />
          {cartItems.length > 0 && (
            <span className="cart-lenght">{cartItems.length}</span>
          )}
        </Link>
      </div>
      {userInfo && (
        <div className="logout-item">
          <span style={{ cursor: 'pointer' }} onClick={logoutHandler}>
            Logout
          </span>
          <i className="fas fa-sign-out-alt" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
