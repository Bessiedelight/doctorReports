const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const reportsRouter = require('./routes/reports');

const app = express();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5000',              // Local development
  'http://localhost:3000',              // Local development
  'https://better-health-live.vercel.app',// Production
  'https://betterhealthpatient.vercel.app',
  'https://better-health-hospital.vercel.app',
  'https://opuscare-patient.vercel.app',
];

// Configure CORS to allow multiple origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., curl) or if the origin is in the allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

dotenv.config();
connectDB();

app.use(express.json());
app.use('/api/reports', reportsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
