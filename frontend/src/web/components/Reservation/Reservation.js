import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbars from '../../../global/Snackbar/Snackbars';
import './Reservation.css';
import Header from '../Header/Header';
import { DateTimePicker } from 'react-rainbow-components';
import { createReservationAction } from '../../../actions/reservationActions';



const containerStyles = {
  maxWidth: 400,
};


const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });
  const [state, setState] = useState({
    name: '',
    note: '',
    date: new Date(),
    phone: '',
  });

const onChange = e => {
  setState({ ...state, [e.target.name]: e.target.value });
  };


  const onSubmit = async e => {
    e.preventDefault();
    let isValid = true;
    if(state.phone){
      const pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(state.phone)) {
        isValid = false;
        setSnackbar({
          ...snackbar,
          open: true,
          error: true,
          message: 'Please only number in phone area!'
        })
        setTimeout(function () {
          setSnackbar({
            ...snackbar,
            open: false,
            error: true,
          })
        }, 1000);
      }else if(state.phone.length !== 11){
        isValid = false;
        setSnackbar({
          open: true,
          error: true,
          message: 'Please enter valid phone number!'
        })
        setTimeout(function () {
          setSnackbar({
            ...snackbar,
            open: false,
            error: true,
          })
        }, 1000);
      }
    }else{
      isValid = false;
      setSnackbar({
        open: true,
        error: true,
        message: 'Please enter phone number!'
      })
      setTimeout(function () {
        setSnackbar({
          ...snackbar,
          open: false,
          error: true,
        })
      }, 1000);
    }
    if(isValid){
      try{
        dispatch(createReservationAction(state));
        setSnackbar({
          open: true,
          error: false,
          message: 'Reservation is created'
        })
        setTimeout(function () {
          setSnackbar({
            ...snackbar,
            open: false,
          })
          navigate("/");
        }, 2000);

      }catch (e) {
        setSnackbar({
          open: true,
          error: true,
          message: e
        })
        setTimeout(function () {
          setSnackbar({
            ...snackbar,
            open: false,
            error: false,
          })
        }, 1000);
      }
    }
  };

  return (
    <section className="reservation-page">
      <Snackbars
        open ={snackbar.open}
        error={snackbar.error}
        message={snackbar.message}
      />
      <Header name="reservation" addBasketButton={false} goBackButton={false} />
      {/*<img width="100%" height="280"  src={reservationImage} />*/}
      <div className="container-reservation">
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <label className="form-row-label" htmlFor="name">Name: </label>
            <input
            className="form-row-input"
            name="name"
            placeholder="Name"
            onChange={onChange} />
          </div>
          <div
            className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
            style={containerStyles}
          >
            <DateTimePicker
              value={state.date}
              onChange={value => setState({ ...state, date: value })}
              className="rainbow-m-around_small"
              minDate={new Date()}
              hour24
              isCentered={true}
            />
          </div>
          <div className="form-row">
            <label className="form-row-label" htmlFor="note">Note: </label>
          <textarea
            className="form-row-input"
            rows="4" cols="50"
            name="note"
            placeholder="Note"
            onChange={onChange}
          />
          </div>
          <div className="form-row">
            <label className="form-row-label" htmlFor="phone">Phone: </label>
          <input
            className="form-row-input"
            name="phone"
            maxLength="11"
            type="tel"
            placeholder="Phone"
            onChange={onChange}
          />
          </div>
          <button className="reservation-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Reservation;
