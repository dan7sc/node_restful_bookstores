import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import bookstore from '../src/routes/bookstore';

const app = express();

process.env.NODE_ENV !== 'prod' && app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/bookstores', bookstore);

export default app;