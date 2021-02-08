import React, { useState, Fragment, useEffect } from 'react';
import Header from '../Header/Header';
import Select from 'react-select';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import './Order.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Image } from '@material-ui/icons';
import Message from '../../../global/Message';
import Spinner from '../../../global/Spinner/Spinner';
import { Card } from '@material-ui/core';
import { getOrderAction } from '../../../actions/orderActions';

const options = [
  { value: 'Home', label: 'home' },
  { value: 'work', label: 'work' }
];

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    height: '45px',
    borderRadius: '6px',
    marginBottom: '20px'
  }),
  option: styles => {
    return {
      ...styles,
      color: 'black',

      ':active': {
        ...styles[':active']
      }
    };
  },
  placeholder: styles => ({ ...styles, top: '26%' })
};

const Order = ({ match }) => {
  const orderId = match.params.id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [total, setTotal] = useState()
  const [value, setValue] = useState({
    user: '',
    foods: [],
    orderAddress: '',
    description: '',
    price: '',
    tableNumber: '',
    orderType: '',
    paymentMethod: ''
  })

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.login)
  const { userInfo } = userLogin

  console.log(order)

  const getTotal = () => {
    let initTotal = 0;
    if(cartItems){
      cartItems.map(el=> {
        initTotal += el.quantity * el.price;
      })
    }
    setTotal(initTotal)
  }


  useEffect(()=>{
    getTotal();
  },[cartItems])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderAction(orderId))
    }
  }, [dispatch, orderId, order])



  return loading ? (
    <Spinner />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> user
              </p>
              <p>
                <strong>Email: </strong>{' '}
                {/*  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>*/}user
              </p>
              <p>
                <strong>Address:</strong>
                Address
              </p>
              {order.orderStatus === "Served" ? (
                <Message variant='success'>
                  Delivered on {order.address}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.paymentStatus === 'Paid' ? (
                <Message variant='success'>Paid on {order.paymentMethod}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/*{order.foods.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.foods.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.imageCover}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            Items
                          </Link>
                        </Col>
                        <Col md={4}>
                          Items
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}*/}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Items</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Items</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Items</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Items</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Order;
