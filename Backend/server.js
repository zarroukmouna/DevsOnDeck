const express = require('express');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/UserRoutes'); 
const AdminRoutes = require('./routes/AdminRoutes'); 
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', UserRoutes);

app.use('/api/admin', AdminRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
