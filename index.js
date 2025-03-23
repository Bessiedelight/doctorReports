const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const reportsRouter = require('./routes/reports');

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use('/api/reports', reportsRouter); // Mount the reports routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));