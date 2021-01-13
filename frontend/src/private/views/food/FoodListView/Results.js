import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles, Button
} from '@material-ui/core';
import getInitials from '../../../utils/getInitials';

import {
  getFoods,
  deleteFood
} from '../../../../actions/foodActions';


const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({categorySelected, className, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const getFoodsData = () => {
    dispatch(getFoods());
  };

  useEffect(() => {
    getFoodsData();
  }, []);

  const foodsData = useSelector(state => state.food.foods);
  const { data, results } = foodsData;

  let newFoodArray = [];
  if(data){
    data.map(el => {
      if (el.category._id === categorySelected.value){
        newFoodArray.push(el)
      }
    })
  }

  const handleSelectAll = event => {
    let newSelectedFoodIds;
    if (event.target.checked) {
      newSelectedFoodIds = data.map(el => el._id);
    } else {
      newSelectedFoodIds = [];
    }

    setSelectedFoodIds(newSelectedFoodIds);
  };

  const handleSelectOne = (event, id) => {
    event.preventDefault();
    const selectedIndex = selectedFoodIds.indexOf(id);
    let newSelectedFoodIds = [];

    if (selectedIndex === -1) {
      newSelectedFoodIds = newSelectedFoodIds.concat(selectedFoodIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFoodIds = newSelectedFoodIds.concat(selectedFoodIds.slice(1));
    } else if (selectedIndex === selectedFoodIds.length - 1) {
      newSelectedFoodIds = newSelectedFoodIds.concat(
        selectedFoodIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedFoodIds = newSelectedFoodIds.concat(
        selectedFoodIds.slice(0, selectedIndex),
        selectedFoodIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFoodIds(newSelectedFoodIds);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {(data) && (
        <>
          <PerfectScrollbar>
            <Box minWidth={1050}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={results && selectedFoodIds.length === results}
                        color="primary"
                        indeterminate={
                          selectedFoodIds.length > 0 && results &&
                          selectedFoodIds.length < results
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newFoodArray && newFoodArray.slice(0, limit).map(food => (
                    <TableRow
                      key={food._id}
                      hover
                      selected={selectedFoodIds.indexOf(food._id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedFoodIds.indexOf(food._id) !== -1}
                          onChange={event => handleSelectOne(event, food._id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar
                            className={classes.avatar}
                            src={food.imageCover}
                          >
                            {getInitials(food.name)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {food.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{food.category.name}</TableCell>
                      <TableCell>
                        {moment(food.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <Button
                          style={{ backgroundColor: '#007bff', color: 'white' }}
                          variant="contained"
                          onClick={e => {
                            e.preventDefault();
                            navigate(`/business/foods/${food._id}`, { replace: true });
                          }}
                        >
                          Edit
                        </Button>{' '}
                        <Button
                          style={{ backgroundColor: '#dc3545', color: 'white' }}
                          variant="contained"
                          onClick={e => {
                            e.preventDefault();
                            dispatch(deleteFood(food._id));
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
          <TablePagination
            component="div"
            count={results && results}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
