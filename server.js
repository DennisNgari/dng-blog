const express = require('express');
const mongoose = require('mongoose');
const app = express();


// Load ENV Variables
require('dotenv').config();

app.use(express.json());

/************************* 
		Set Up DB 
*************************/
mongoose.connect(process.env.MONGO_URI, 
	{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
},()=>{
	console.log("connected")
}
);

/*******************************
		Import Routes
*******************************/

const home = require('./app/routes/home');
const users = require('./app/routes/users');
const posts = require('./app/routes/posts');

/*******************************
		Initialize Routes
*******************************/
app.use('/api/v1/home', home);
app.use('/api/v1/auth', users);
app.use('/api/v1/posts', posts);


// Set port, listen for requests
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, ()=> {
	console.log(`Server is listening on ${PORT}`);
});