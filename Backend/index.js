const express = require('express');
const connectDB = require('./db/mongoose');
const config = require('./config/config');
const app = express();
const port = 8000; 

connectDB(config.MONGO_URI);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
