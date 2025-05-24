const express = require('express');
const connectDB = require('./data/database');
require('express-async-errors');
const swaggerSetup = require('./swagger');
require('dotenv').config();

connectDB();

const productRoutes = require('./routes/products');
const { handleError } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
swaggerSetup(app);

// ✅ Custom root route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to Project 2 - Products API');
});

app.use('/products', productRoutes);
app.use(handleError);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
