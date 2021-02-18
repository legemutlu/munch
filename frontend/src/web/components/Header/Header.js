import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = props => {
  return (
    <>
      <div className="header">{props.name}</div>
      {props.addBasketButton && (
        <button className="order-button" onClick={props.onClickAdd}>
          Add to Basket
        </button>
      )}
      {props.goBackButton && (
        <Link to={props.link} className="go-back-button">
          Go Back
        </Link>
      )}
      <hr />
    </>
  );
};

export default Header;
