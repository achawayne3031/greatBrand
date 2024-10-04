const env = require('dotenv').config({ debug: process.env.DEBUG });
const express = require('express');
// const dbConnect = require('./config/init');
const ticket = require('./router/ticketRoute');
const event = require('./router/eventRoute');
const cors = require('cors')
 

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(cors());;



app.use('/api/ticket', ticket);
app.use('/api/event', event);





process.on('uncaughtException', function(err) {
    console.log(err);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server on port ${port}`);


if (process.env.ERROR) {
    console.log(process.env.ERROR);
}
  
