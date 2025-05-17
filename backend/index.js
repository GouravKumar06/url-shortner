import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();

//local imports
import connectDB from './src/config/db.js';
import ShortUrl from './src/models/shortUrl.js';


//initialize express app
const app = express();

// getting port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/create', (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  const shortUrl = nanoid(8);
  const newUrl = new ShortUrl({
    originalUrl,
    shortUrl,
  });

  newUrl.save()
 
  res.send('Welcome to the URL Shortener API');
});

//connect to database
connectDB();

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



