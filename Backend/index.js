const express = require('express');
const connectDB = require('./db/mongoose');
const config = require('./config/config');
const OrgUserRoutes = require('./routes/OrgUserRoutes'); 
const DevUserRoutes = require('./routes/DevUserRoutes'); 
const cors = require('cors'); 

const app = express();
const port = 8000;

connectDB(config.MONGO_URI);

app.use(cors()); 

app.use(express.json()); 

app.use('/api/OrgUsers', OrgUserRoutes); 
app.use('/api/DevUsers', DevUserRoutes);

app.get('/', (req, res) => {
    res.send('Test'); 
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 


