const express = require('express');
const mongoose = require('mongoose');
const app = express();
const verificationRoutes = require('./routes/verificationRoutes');
const listingRoutes = require('./routes/listingRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Could not connect to MongoDB:", error));

// Route middleware
app.use('/api/verification', verificationRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/profile', profileRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
