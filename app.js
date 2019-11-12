const express = require('express');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require( './routes/authenticationData');

const dotenv = require('dotenv');
dotenv.config();
mongoose.set('useFindAndModify', false);

mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser:true , useUnifiedTopology: true } , ()=>{
  console.log('Connected to DB');
});

app.use(express.json());
app.use('/api/user',authRoutes);

app.listen(80, ()=> console.log('Server Up. Listening to port 80.........'));

module.exports = app;
