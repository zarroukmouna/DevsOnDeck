const express = require('express');
const connectDB = require('./db/mongoose');
const config = require('./config/config');
const OrgUserRoutes = require('./routes/OrgUserRoutes'); 
const DevUserRoutes = require('./routes/DevUserRoutes'); 
const corsMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 8000;

connectDB(config.MONGO_URI);

app.use(corsMiddleware);

app.use(express.json()); 

app.use('/api/OrgUsers', OrgUserRoutes); 
app.use('/api/DevUsers', DevUserRoutes); 

app.get('/', (req, res) => {
    res.send('Test'); 
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


