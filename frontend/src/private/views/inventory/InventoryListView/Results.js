import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import Snackbars from '../../../../global/Snackbar/Snackbars';
import { deleteInventoryAction } from '../../../../actions/inventoryActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ inventory, className, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({
    inventoryData: []
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });

  const deleteInventory = (id) => {
      dispatch(deleteInventoryAction(id));
      const deletedInventory = inventory.filter(el=>el._id !== id)
      setState({
        ...state,
        inventoryData: deletedInventory
      })
      setSnackbar({
        ...snackbar,
        open: true,
        error: true,
        message: 'Ingredient Deleted!'
      });
    setTimeout(function () {
      navigate(0);
    }, 1500);
  }

  useEffect(() => {
   setState({
     ...state,
     inventoryData: inventory
   })
  }, [inventory]);

  if (state.inventoryData) {
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <Snackbars
          open={snackbar.open}
          error={snackbar.error}
          message={snackbar.message}
        />
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.inventoryData.map((element) => (
                  <TableRow key={element._id} hover>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {element.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{element.category}</TableCell>
                    <TableCell>{element.quantity}</TableCell>
                    <TableCell>{element.imageCover}</TableCell>
                    <TableCell>
                      {moment(element.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <Button
                        style={{ backgroundColor: '#007bff', color: 'white' }}
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/business/inventories/${element._id}`, {
                            replace: true
                          });
                        }}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        style={{ backgroundColor: '#dc3545', color: 'white' }}
                        variant="contained"
                        onClick={(e)=> {
                          e.preventDefault();
                          deleteInventory(element._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    );
  } else {
    return <p>Please Select Category</p>;
  }
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
