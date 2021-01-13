import React, { useState } from 'react';
import Header from '../Header/Header';
import Select from 'react-select';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import './Order.css';

const options = [
  { value: 'Home', label: 'home' },
  { value: 'work', label: 'work' }
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
  const [selectedDate, handleDateChange] = useState(new Date());

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
            <form>
              <div className="row">
                <div className="col-50">
                  <h3>Billing</h3>
                  <label htmlFor="fname">
                    <i className="fa fa-user"></i> Full Name
                  </label>
                  <input
                    className="order-input"
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                  />
                  <label htmlFor="adr">
                    <i className="fas fa-map-marked"></i> Address
                  </label>
                  <Select
                    options={options}
                    placeholder="Select Address"
                    styles={customStyles}
                  />
                  <label>
                    <i className="fas fa-box-open"></i>Deleviry Time
                  </label>
                  <div className="container">
                    <div className="row">
                      <div className="container-now">
                        <input type="radio" name="sameadr" /> {'  '}
                        Now (20-30 minutes)
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="container-future">
                        <input type="radio" name="sameadr" /> {'  '} Future
                      </div>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                          inputVariant="outlined"
                          ampm={false}
                          disablePast
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                </div>

                <div className="col-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i
                      className="fab fa-cc-visa"
                      style={{ color: 'white' }}
                    ></i>
                    <i
                      className="fab fa-cc-amex"
                      style={{ color: 'white' }}
                    ></i>
                    <i
                      className="fab fa-cc-mastercard"
                      style={{ color: 'white' }}
                    ></i>
                    <i
                      className="fab fa-cc-discover"
                      style={{ color: 'white' }}
                    ></i>
                  </div>
                  <label htmlFor="cname">Name on Card</label>
                  <input
                    className="order-input"
                    type="text"
                    id="cname"
                    name="cardname"
                    placeholder="John More Doe"
                  />
                  <label htmlFor="ccnum">Credit card number</label>
                  <input
                    className="order-input"
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                    placeholder="1111-2222-3333-4444"
                  />
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="expyear">Exp Date</label>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          inputVariant="outlined"
                          disablePast
                          views={['year', 'month']}
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className="col-50">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        className="order-input"
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="352"
                      />
                    </div>
                  </div>
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
          <div className="container">
            <h4>
              Cart{' '}
              <span className="price" style={{ color: 'white' }}>
                <i className="fa fa-shopping-cart"></i> <b>4</b>
              </span>
            </h4>
            <p>
              <a href="#">Product 1</a> <span className="price">$15</span>
            </p>
            <p>
              <a href="#">Product 2</a> <span className="price">$5</span>
            </p>
            <p>
              <a href="#">Product 3</a> <span className="price">$8</span>
            </p>
            <p>
              <a href="#">Product 4</a> <span className="price">$2</span>
            </p>
            <hr />
            <p>
              Total{' '}
              <span className="price" style={{ color: 'white' }}>
                <b>$30</b>
              </span>
            </p>
          </div>
          <div className="container-text">
            <h5>Order Note</h5>
            <textarea className="order-text"></textarea>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
