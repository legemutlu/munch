import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  makeStyles,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import Snackbars from '../../../global/Snackbar/Snackbars';
import Spinner from '../../../global/Spinner/Spinner';
import { getContactsAction, updateContactAction } from '../../../actions/contactActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ContactDetails = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });

  const [values, setValues] = useState({
    workHours: [],
    address: '',
    phone: '',
    wifi: {},
    id:'',
    workDay:'',
    workTime:''
  });

  const getContact = () => {
    dispatch(getContactsAction());
  };


  const contactData = useSelector((state) => state.contactList);
  const { contacts } = contactData;

  const contactUpdateData = useSelector((state) => state.contactUpdate);
  const { success, error } = contactUpdateData;
  console.log(contacts)

  useEffect(()=>{
    getContact();
  },[])



  const contactDetails = () =>{
    if(contacts.length > 0) {
      setValues({
        ...values,
        id: contacts[0]._id,
        address: contacts[0].address,
        workHours: contacts[0].workHours,
        phone: contacts[0].phone,
        wifi: contacts[0].wifi
      });
    }
  }

  useEffect(() => {
    if (success) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: false,
        message: 'Contact Updated!'
      });
      setTimeout(function () {
        setSnackbar({
          ...snackbar,
          open: false,
        });
        navigate(`/business`);
      }, 2200);
    } else if (error) {
      setSnackbar({
        ...snackbar,
        open: true,
        error: true,
        message: error
      });
    }
  }, [success, error]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleClose = () => {
    let workHoursNew = values.workHours.slice(0);
    setOpen(false);
    workHoursNew.push({
      day: values.workDay,
      time: values.workTime
    });
    setValues({
      ...values,
      workHours: workHoursNew
    });
  };

  const deleteWorkHour = (id) => {
    const updatedWorkHour = values.workHours.filter((el) => el._id !== id);
    setValues({
      ...values,
      workHours: updatedWorkHour
    });
  };

    useEffect(() => {
    contactDetails();
  }, [contacts]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateContactAction(values.id, values));
  };

  return (
   <>
      <Snackbars
        open={snackbar.open}
        error={snackbar.error}
        message={snackbar.message}
      />

      <form
        onSubmit={onSubmit}
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        {!contacts.length > 0 ? (
          <Spinner />
        ) : (
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Contact Information"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="phone"
                    name="phone"
                    onChange={handleChange}
                    required
                    value={values.phone || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="wifi name"
                    name="wifi"
                    onChange={handleChange}
                    required
                    value={values.wifi.name || ''}
                    variant="outlined"
                  />
                  <Divider />
                  <br />
                  <TextField
                    fullWidth
                    label="wifi password"
                    name="wifi"
                    onChange={handleChange}
                    required
                    value={values.wifi.password || ''}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Address"
                    name="address"
                    fullWidth
                    onChange={handleChange}
                    multiline={true}
                    rows={8}
                    variant="outlined"
                    required
                    defaultValue={values.address || ''}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Add Work Hours
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll="body"
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Add</DialogTitle>
                  <DialogContent dividers>
                    <DialogContentText>
                      To subscribe to this website, please enter your email
                      address here. We will send updates occasionally.
                    </DialogContentText>
                   <TextField
                      autoFocus
                      variant="outlined"
                      margin="dense"
                      id="workDay"
                      label="workHourDay "
                      name="workDay"
                      onChange={handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogContent>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="dense"
                      id="workTime"
                      label="workHourTime"
                      name="workTime"
                      onChange={handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              <Divider />
              <br/>
                  {values.workHours.length > 0  && (
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Hour</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.workHours.map((element) => (
                            <TableRow key={element._id}>
                              <TableCell>{element.day}</TableCell>
                              <TableCell>{element.time}</TableCell>
                              <TableCell>
                                <Button
                                  style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white'
                                  }}
                                  variant="contained"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteWorkHour(element._id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </Box>
          </Card>
        )}
      </form>
    </>
  );
};

ContactDetails.propTypes = {
  className: PropTypes.string
};

export default ContactDetails;
