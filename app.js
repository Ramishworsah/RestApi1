const express = require('express');
const bodyParser = require('body-parser');
const connectDB=require('./dbconfig/courseDb');
connectDB()
const courseRouter = require('./routers/courseRouter');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', courseRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
