import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

//local imports
import connectDB from './src/config/db.js';
import shortRoute from './src/routes/shortRoute.js'


//initialize express app
const app = express();

// getting port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

//global middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//local middlewares
app.use('/api',shortRoute)

//connect to database
connectDB();

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



