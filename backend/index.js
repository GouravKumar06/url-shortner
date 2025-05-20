import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

//local imports
import connectDB from './src/config/db.js';
import shortRoute from './src/routes/shortRoute.js'
import authRoute from './src/routes/authRoutes.js';


//initialize express app
const app = express();

// getting port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

//global middleware
app.use(cors({
  origin: 'https://url-shortner-frontend-2o6v.onrender.com/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//local middlewares
app.use('/api',shortRoute)
app.use('/api',authRoute)

//connect to database
connectDB();

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



