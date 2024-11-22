const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname));

app.use('/expenses', expenseRoutes);

// Serve the main index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(3000, () => {
    console.log("Server connected");
});
