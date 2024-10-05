const env = require('dotenv').config({ debug: process.env.DEBUG });
const express = require('express');
const ticket = require('./router/ticketRoute');
const event = require('./router/eventRoute');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
 

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());;

// Apply rate limiting  
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit to 200 requests per windowMs
}));


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
  
