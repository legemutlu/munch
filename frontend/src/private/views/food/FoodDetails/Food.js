import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { updateFoodAction } from '../../../../actions/foodActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'none'
    }
  },
  input: {
    display: 'none'
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const Food = ({ food, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [image, setImage] = useState({ preview: '', raw: '' });

  const handleChange = async (e) => {
    if (e.target.files.length) {
      console.log(e.target.files);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageCover', image.raw);
    await dispatch(updateFoodAction(food._id, formData));
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {food && (
        <>
          <CardContent>
            <Box alignItems="center" display="flex" flexDirection="column">
              {image.preview ? (
                <img src={image.preview} alt="dummy" width="320" height="200" />
              ) : (
                <img
                  width="320"
                  height="200"
                  src={`/static/images/foods/${food.imageCover}`}
                />
              )}
            </Box>
            <Box alignItems="center" display="flex" flexDirection="column">
              <br />
              <Typography color="textPrimary" gutterBottom variant="h3">
                {food.name}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          {image.preview && (
            <Box alignItems="center" display="flex" flexDirection="column">
              <Button
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  width: '25px',
                  marginTop: '10px'
                }}
                onClick={handleUpload}
              >
                Save
              </Button>
            </Box>
          )}
          <CardActions>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="contained-button-file" style={{ width: '100%' }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="span"
              >
                Upload Image
              </Button>
            </label>
          </CardActions>
        </>
      )}
    </Card>
  );
};

Food.propTypes = {
  className: PropTypes.string
};

export default Food;
