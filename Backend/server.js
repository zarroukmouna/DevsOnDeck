const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const UserRoutes = require('./routes/UserRoutes'); 
const cors = require('cors'); 
const app = express();
const port = 8000;

connectDB();

app.use(cors()); 

app.use(express.json()); 

app.use('/api/users', UserRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 


