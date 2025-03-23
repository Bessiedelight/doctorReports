const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Add CORS package
const connectDB = require('./db');
const reportsRouter = require('./routes/reports');

const app = express();

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

dotenv.config();
connectDB();

app.use(express.json());
app.use('/api/reports', reportsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));