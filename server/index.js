import express from 'express';
import bodyParser from 'body-parser';

import apiRouter from './api/router';
import appRouter from './app/router';

const dir = require('path').resolve.bind(null, process.cwd());
const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4256; // app port

// Static files
app.use('/static', express.static(dir('dist')));

// Initialize server side api
app.use('/api', apiRouter);

// Initialize front side
app.use('/', appRouter);

app.listen(port);
console.log(`Server start on port ${port}`);
