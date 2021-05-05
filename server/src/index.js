const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// Schützt vor XSS Attacken!
const xss = require('xss-clean');
const mongoose = require('mongoose'); // mongodb object modeling

// Umgebungsvariablen enablen
require('dotenv').config();

// Middlewares
const middlewares = require('./middlewares');

// Routes
const logs = require('./api/logs');

const app = express();

// Set CSP
app.use(middlewares.contentSecurityPolicy);

// Datenbank Connection
if (process.NODE_ENV === 'development') {
  mongoose
    .connect(process.env.DATABASE_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('local DB connection successfull'));
} else if (process.NODE_ENV === 'production') {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('live DB connection successfull'));
}

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
// Bodyparser
app.use(express.json());
// Data sanitisation against XSS => escaped unter anderem code und html tags
app.use(xss());

/* ROUTING */
app.use('/api/logs', logs);

/* Page not Found */
app.use(middlewares.notFound);
/* Error Middleware */
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
