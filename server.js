const express = require('express');
const path = require('path');
const logger = require('morgan');
const config = require('config');

const app = express();

app.use(logger('dev'));
app.use(express.json({ extended: false }));

app.use('/api/products', require('./routes/api/products'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
