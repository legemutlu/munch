import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { getFoodAction } from '../../../actions/foodActions';
import { addToCart } from '../../../actions/cartActions';
import Spinner from '../../../global/Spinner/Spinner';
import Snackbars from '../../../global/Snackbar/Snackbars';
import Rating from '../../../global/Rating';

const ProductScreen = ({ history, match }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[3];
  const backPath = location.pathname.split('/')[1];

  const getFoodData = () => {
    dispatch(getFoodAction(path));
  };

  const foodDetailData = useSelector(state => state.foodDetails);
  const {food, loading, error }= foodDetailData;
  const user = useSelector(state => state.login);


  const addItemHandler = id => {
    setQuantity(quantity + 1);
    dispatch(addToCart(id, quantity));
  };

  useEffect(() => {
    getFoodData();
  }, []);



  return (
    <>
      <Link className='btn btn-light my-3' to={`/${backPath}`}>
        Go Back
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Snackbars open={true} message={error} />
      ) : (
        <>
          <h1 title={food.name} />
          <Row>
            <Col md={6}>
              <Image src={`/static/images/foods/${food.imageCover}`} alt={food.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{food.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={food.ratingsAverage}
                    text={`${food.ratingsQuantity} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${food.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {food.description}
                </ListGroup.Item>
                  {food && food.ingredient &&  (
                    <ListGroup.Item>
                        Ingredients:
                        {food.ingredient.map(el=>
                          <Col key={el._id.id}>
                            <strong>${el._id.name}</strong>
                          </Col>
                        )}
                  </ListGroup.Item>
                  )}
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${food.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        if(user.userInfo){
                          addItemHandler(food._id);
                        }else{
                          navigate(`/login`, { replace: true })
                        }}}
                      className='btn-block'
                      type='button'
                      style={{backgroundColor: '#506f95'}}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/*<Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {food.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {food.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>*/}
        </>
      )}
    </>
  )
}

export default ProductScreen