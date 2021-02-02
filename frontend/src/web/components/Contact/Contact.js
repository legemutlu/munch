import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import "./Contact.css"
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { getContactsAction } from '../../../actions/contactActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../global/Spinner/Spinner';


const Contact = () => {
    const dispatch = useDispatch();
    const getContact = () => {
        dispatch(getContactsAction());
    };
    const contactData = useSelector((state) => state.contactList);
    const { contacts } = contactData;

    useEffect(()=>{
        getContact();
    },[])

  return (
    <section className="contact-page">
      <Header name="contact" addBasketButton={false} goBackButton={false} />
        {contacts.length > 0 ?
        <div className="float-container">
            <div className="float-child">
                <div className="green">
                    <label>Address</label>
                    <hr/>
                    <p>{contacts[0].address}</p>
                </div>
            </div>
            <div className="float-child">
                <div className="blue">
                    <label>Phone</label>
                    <hr/>
                    <p>{contacts[0].phone}</p>
                </div>
            </div>
            <div className="float-child">
                <div className="green">
                    <label>Wifi</label>
                    <hr/>
                    <p>Wifi Name: {contacts[0].wifi.name}</p>
                    <p>Wifi Password: {contacts[0].wifi.password}</p>
                </div>
            </div>
            {contacts[0].workHours.length > 0 &&
                <div className="float-child">
                    <div className="blue">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Days</TableCell>
                                    <TableCell>Times</TableCell>
                                </TableRow>
                            </TableHead>
            {contacts[0].workHours.map((element)=>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell>
                                        {element.day}
                                    </TableCell>
                                    <TableCell>{element.time}</TableCell>
                                </TableRow>
                            </TableBody>
            )}
                        </Table>
                    </div>
                </div>
                }

        </div> :
          <Spinner />
        }


    </section>
  );
}

export default Contact;
