const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const contactRouter = require('./routes/contactRoutes');
const reservationRouter = require('./routes/reservationRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware

// Set security HTTP headers
app.use(helmet());
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.options('*', cors());
// Production logging

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMiliseconds: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution - inside whitelist are allowed parameters
app.use(
  hpp({
    whitelist: [
      'price',
      'calorie',
      'ratingsQuantity',
      'ratingsAverage',
      'preparationTime',
    ],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use(express.static(path.join(__dirname, '/frontend/build')));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.method, req.url);
  next();
});

// Routes
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/inventories', inventoryRouter);
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/reservations', reservationRouter);
app.use('/api/v1/contacts', contactRouter);

// Error Handling Middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
