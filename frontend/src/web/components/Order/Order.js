import React, { useState, Fragment, useEffect } from 'react';
import Header from '../Header/Header';
import Select from 'react-select';
import './Order.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrderAction } from '../../../actions/orderActions';
import { clearCart } from '../../../actions/cartActions';

const optionsPaymentMethod = [
  { value: 'Card', label: 'Card' },
  { value: 'OnlineCard', label: 'OnlineCard' },
  { value: 'Cash', label: 'Cash' }
];

const optionsOrderType = [
  { value: 'TakeAway', label: 'TakeAway' },
  { value: 'HomeDelivery', label: 'HomeDelivery' },
  { value: 'InRestaurant', label: 'InRestaurant' }
];

const optionsOrderAddress = [
  { value: 'Home', label: 'Home' },
  { value: 'Work', label: 'Work' }
];

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    height: '45px',
    borderRadius: '6px',
    marginBottom: '20px'
  }),
  option: styles => {
    return {
      ...styles,
      color: 'black',

      ':active': {
        ...styles[':active']
      }
    };
  },
  placeholder: styles => ({ ...styles, top: '26%' })
};

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [total, setTotal] = useState()
  const [value, setValue] = useState({
    foods: [],
    orderAddress: '',
    description: '',
    tableNumber: '',
    orderType: '',
    paymentMethod: ''
  })

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.login)
  const { userInfo } = userLogin

  const getTotal = () => {
    let initTotal = 0;
    let foodArr = [];
    if(cartItems){
      cartItems.map(el=> {
        foodArr.push(el)
        setValue({
          ...value,
          foods: foodArr
        })
        initTotal += el.quantity * el.price;
      })
    }
    setTotal(initTotal)
  }



  const handleSelectedOrderType = (selectedValue) => {
    setValue({
      ...value,
      orderType: selectedValue.value
    });
  };

  const handleSelectedOrderAddress = (selectedValue) => {
    setValue({
      ...value,
      orderAddress: selectedValue.value
    });
  };

  const handleSelectedPaymentMethod = (selectedValue) => {
    setValue({
      ...value,
      paymentMethod: selectedValue.value
    });
  };


  useEffect(()=>{
    getTotal();
  },[cartItems])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  })

  const onSubmit = async(e) => {
    e.preventDefault();
    const newArr = [];
    if(value.food || value.foods.length > 0){
      for(const item in value.foods){
        newArr.push({food:value.foods[item]})
      }
    }
    const order = {
      foods: newArr,
      orderType:value.orderType,
      orderAddress:value.orderAddress,
      paymentMethod:value.paymentMethod
    }
    await dispatch(createOrderAction(order));
    await dispatch(clearCart())
    navigate('/profile')
  }

  return (
    <section className="order-page">
      <Header
        name="order"
        addBasketButton={false}
        goBackButton={true}
        link="/cart"
      />
      <div className="full-row">
        <div className="col-65">
          <div className="container">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-50">
                  <h3>Billing</h3>
                  <label htmlFor="adr">
                    <i className="fas fa-map-marked"/> Address
                  </label>
                  <Select
                    options={optionsOrderAddress}
                    placeholder="Select Address"
                    styles={customStyles}
                    onChange={handleSelectedOrderAddress}
                  />
                  <label>
                    <i className="fas fa-box-open"/>Order Type
                  </label>
                    <Select
                      options={optionsOrderType}
                      placeholder="Select Type of Order"
                      styles={customStyles}
                      onChange={handleSelectedOrderType}
                    />
                </div>

                <div className="col-50">
                  <h3>Billing</h3>
                  <label>
                    <i className="fas fa-box-open"/>Payment Method
                  </label>
                  <Select
                    options={optionsPaymentMethod}
                    placeholder="Select Type of Payment"
                    styles={customStyles}
                    onChange={handleSelectedPaymentMethod}
                  />
                </div>
                <input
                  type="submit"
                  value="Continue to checkout"
                  className="btn"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-25">

          {cartItems &&
          <div className="container">
            <h4>
              Cart{' '}
              <span className="price" style={{ color: 'white' }}>
                <i className="fa fa-shopping-cart"/> <b>{cartItems.length}</b>
              </span>
            </h4>
            {cartItems.length > 0 && cartItems.map(el=>
              <p key={el.id}>
                <a href="#">{el.name}</a> <span>(x{el.quantity})</span><span className="price">${el.price}</span>
              </p>
            )}
            <hr />
            <p>
              Total{' '}
              <span className="price" style={{ color: 'white' }}>
                   <b>${total}</b>
                  </span>
            </p>
          </div>
          }

          <div className="container-text">
            <h5>Order Note</h5>
            <textarea className="order-text"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
