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
const disclosureRoutes = require('./src/routes/disclosureRoutes');
const galleryRoutes = require('./src/routes/galleryRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const topperRoutes = require('./src/routes/topperRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/school-profile', schoolProfileRoutes);
app.use('/api/disclosures', disclosureRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/toppers', topperRoutes);

app.get('/', (req, res) => {
    res.json({ success: true, message: "Oxford Public School API is Live! 🏫" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running smoothly on port ${PORT}`);
});