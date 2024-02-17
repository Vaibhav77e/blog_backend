const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectToDatabase = require('./database/database');
const userRoutes = require('./routes/user_route');


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

// import all routes
app.use('/api/v1',userRoutes);


// import middlewares
app.use(errorMiddlewares);

app.listen(PORT ,()=>{});

console.log(`started to listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);

