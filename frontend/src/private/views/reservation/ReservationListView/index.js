import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import { getReservationsAction } from '../../../../actions/reservationActions';
import moment from 'moment';
import { Calendar, momentLocalizer  } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux';

import "react-big-calendar/lib/css/react-big-calendar.css";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const ReservationListView = () => {
  const classes = useStyles();
  const localized = momentLocalizer(moment)
  const dispatch = useDispatch();
  const [state, setState] = useState([]);

  const getReservations = () => {
    dispatch(getReservationsAction());
  };

  useEffect(()=>{
    getReservations();
  },[])

  const reservationData = useSelector(state => state.reservationList)
  const {reservations}= reservationData;


    let newReservationArray = [];
  if(reservations){
    reservations.map((el)=>{
console.log(moment(el.date))
      newReservationArray.push({
        start: el.date,
        end: el.date,
        id:el._id,
        title:el.name,
        note:el.note,
        phone:el.phone,
        allDay: true
      })
    })



  }

  return (
    <Page
      className={classes.root}
      title="Reservations">
      <Container maxWidth={false}>
        <Box mt={3}>
          {reservations &&
          <Calendar
            localizer={localized}
            events={newReservationArray}
            style={{ height: 500 }}
          />
          }
        </Box>
      </Container>
    </Page>
  );
};

export default ReservationListView;
