import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(prop) {
  return <MuiAlert elevation={6} variant="filled" {...prop} />;
}

const Snackbars = props => {
  const [open, setOpen] = useState(false);

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (props.open === true) {
      setOpen(true);
    }
  }, [props.open]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={props.error ? 'error' : 'success'}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Snackbars;
