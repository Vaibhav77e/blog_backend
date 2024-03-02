const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectToDatabase = require('./database/database');

// import error handler from npm package
const errorHandler = require('express-async-errors');

// import all routes
const userRoutes = require('./routes/user_route/user_route');
const blogRoutes = require('./routes/blog_route');
const commentsRoutes = require('./routes/comments_route');

const search = require('./routes/searchroutes');

//Setting up config.env file variables
dotenv.config({path:'./config/config.env'});

// define port
const PORT = 3000;

// import middlewares
const errorMiddlewares = require('./middlewares/errorMiddlewares');

// connect to database
connectToDatabase();

// convert the data into json format
app.use(express.json());
app.use(express.urlencoded());

// initialize all imported routes
app.use('/api/v1',userRoutes);
app.use('/api/v1',blogRoutes);
app.use('/api/v1',commentsRoutes);

// test
app.use('/api/v1',search);

// import middlewares
app.use(errorMiddlewares);

// server starts here
app.listen(PORT ,()=>{});

console.log(`started to listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);

