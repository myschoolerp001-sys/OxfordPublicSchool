const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const schoolProfileRoutes = require('./src/routes/schoolProfileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/school-profile', schoolProfileRoutes);

app.get('/', (req, res) => {
    res.json({ success: true, message: "Oxford Public School API is Live! 🏫" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running smoothly on port ${PORT}`);
});