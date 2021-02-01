import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbars from '../../../global/Snackbar/Snackbars';
import './Login.css';

import { login } from '../../../actions/authActions';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const userLoginState = useSelector(state => state.login);
  const { error, userInfo } = userLoginState;

  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/menu', { replace: true });
    }
  }, [userInfo]);

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      email: userData.email,
      password: userData.password
    };
    if (user) {
      dispatch(login(user));
    }
  };

  return (
    <section className="login-page">
      <Snackbars
        open={error ? true : false}
        error={error ? 'true' : 'false'}
        message={error ? error.message : 'Success'}
      />
      <div className="login">
        <div className="login-header">Munch</div>
        <form onSubmit={onSubmit}>
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChange}
          />
          <input
            className="login-input"
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChange}
          />
          <button className="login-button" type="submit">
            Sign In
          </button>
        </form>
        <div style={{ align: 'center', padding: '25px' }}>
          <Link to="/password-forgot" className="login-footer">
            Forgot Password?
          </Link>
          <Link to="/register" className="login-footer">
            Don't you have an account?
          </Link>
        </div>
      </div>
    </section>
  );
}
