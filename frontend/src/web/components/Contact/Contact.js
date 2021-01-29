import React, { useState } from 'react';
import Header from '../Header/Header';
import "./Contact.css"
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


const Contact = () => {

  return (
    <section className="contact-page">
      <Header name="contact" addBasketButton={false} goBackButton={false} />
        <div className="float-container">

            <div className="float-child">
                <div className="green">
                    <label>Address</label>
                    <hr/>
                    <p>this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2</p>
                </div>
            </div>

            <div className="float-child">
                <div className="blue">

                    <label>Phone</label>
                    <hr/>
                    <p>this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2</p>

                </div>
            </div>
            <div className="float-child">
                <div className="green">
                    <label>Wifi</label>
                    <hr/>
                    <p>this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2 this is paragraph for float colum 2</p>
                </div>
            </div>

            <div className="float-child">
                <div className="blue">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Days</TableCell>
                                <TableCell>Times</TableCell>
                            </TableRow>
                        </TableHead>
                              <TableBody>
                                  <TableRow hover>
                                      <TableCell>
                                          Days
                                      </TableCell>
                                      <TableCell>Times</TableCell>
                                  </TableRow>
                              </TableBody>
                    </Table>
                </div>
            </div>


      </div>

    </section>
  );
}

export default Contact;
