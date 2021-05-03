const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose'); // mongodb object modeling

// Middlewares
const middlewares = require('./middlewares');

const app = express();

// Datenbank Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hallo Welt',
  });
});

/* Page not Found */
app.use(middlewares.notFound);

/* Error Middleware */
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
