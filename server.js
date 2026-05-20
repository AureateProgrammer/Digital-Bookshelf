const express = require('express');
const connectDB = require('./db/connection');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
