import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      style={{width: '60px'}}
      src="/static/logo.png"
      {...props}
    />
  );
};

export default Logo;
