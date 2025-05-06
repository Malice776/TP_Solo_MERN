require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const publicationRoutes = require('./routes/publicationRoutes');
// const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/publications', publicationRoutes); // Routes for publications
// app.use('/api/users', userRoutes); // Routes for users

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5001; // Default to port 5000 if not defined in .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
