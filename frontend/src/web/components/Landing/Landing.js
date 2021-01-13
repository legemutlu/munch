import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Landing.css';

const Landing = () => {
  const userLoginState = useSelector(state => state.login);
  const { userInfo } = userLoginState;
  return (
    <section className="landing-page">
      <div className="landing">
        <h1 className="landing-header">Munch</h1>
        <span className="landing-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </span>
        <div className="landing-buttons">
          {userInfo ? (
            <h1>Welcome {userInfo.user.name}</h1>
          ) : (
            <>
              <RouterLink to="/login" className="landing-button-left">
                Login
              </RouterLink>
              <RouterLink to="/register" className="landing-button-right">
                Register
              </RouterLink>{' '}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
