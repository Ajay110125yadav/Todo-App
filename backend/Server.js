const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();  // .env file load

const app = express();
app.use(express.json());  // Json data pass karne ke liye
app.use(cors());  // Enable CORS

// mongodb connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('mongoose connected!'))
.catch((err => console.log('Mongoose not connected')))

// add routes

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// simple test route
app.get('/' , (req, res) => {
  res.send('Backend is running!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


