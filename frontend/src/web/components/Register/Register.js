import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbars from '../../../global/Snackbar/Snackbars';
import './Register.css';
import { register } from '../../../actions/authActions';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  });

  const userRegister = useSelector(state => state.register);
  let { error, userInfo } = userRegister;

  if (error) console.log(userRegister);

  useEffect(() => {
    if (userInfo) {
      navigate('/menu', { replace: true });
    }
  }, [userInfo]);

  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm
    };

    if (userData.password !== userData.passwordConfirm) {
      error = 'Passwords do not match';
    } else {
      dispatch(register(newUser));
    }
  };

  return (
    <section className="register-page">
      <Snackbars
        open ={error ? true : false}
        error={error ? 'true' : 'false'}
        message={error ? error.message : 'Success'}
      />
      <div className="register-header">Munch</div>
      <div className="register-body">
        <div className="register-text">Create Account</div>
      </div>
      <div className="register-form">
        <h1 className="register-form-header">Register</h1>
        <form className="register-form-container" onSubmit={onSubmit}>
          <input
            className="register-form-item"
            name="name"
            placeholder="Name"
            onChange={onChange}
          />
          <input
            className="register-form-item"
            name="surname"
            placeholder="Surname"
            onChange={onChange}
          />
          <input
            className="register-form-item"
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChange}
          />
          <input
            className="register-form-item"
            name="phone"
            type="tel"
            placeholder="Phone"
            onChange={onChange}
          />
          <input
            className="register-form-item"
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChange}
          />
          <input
            className="register-form-item"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            onChange={onChange}
          />
          <button className="register-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
