
import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { getMeAction, getUserDetails, updateUserAction } from '../../../actions/userActions';
import { listMyOrders } from '../../../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../../../constants/userConstants';
import Snackbars from '../../../global/Snackbar/Snackbars';
import Spinner from '../../../global/Spinner/Spinner';
import './Profile.css'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: ''
  });


  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.login)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdate)
  const { success, error: updateError } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getMeAction())
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserAction({ id: user._id, name, email, password }))
      setTimeout(function () {
        navigate(`/`);
      }, 2000);
    }
  }

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {message && <Snackbars open={true} error={true} message={message} />}
        {}
        {success && <Snackbars open={true} error={false} message={'Profile Updated'} />}
        {updateError && <Snackbars open={true} error={true} message={updateError} />}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Snackbars open={true} error={true} message={error} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Spinner />
        ) : errorOrders ? (
          <Snackbars open={true} error={true} message={errorOrders} />
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>ORDER TYPE</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
             {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.price}</td>
                <td>
                  {order.paymentStatus}
                </td>
                <td>
                  {order.orderType}
                </td>
                <td>
                  {order.orderStatus}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button
                      className="detail-button"
                    >
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen