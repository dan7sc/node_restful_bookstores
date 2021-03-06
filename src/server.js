import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import bookstore from '../src/routes/bookstore';
import book from '../src/routes/book';
import customer from '../src/routes/customer';
import passport from 'passport';

const app = express();

process.env.NODE_ENV !== 'prod' && app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/api/v1/customers', customer);
app.use('/api/v1/bookstores', bookstore);
app.use('/api/v1/bookstores', book);
app.use('/api/v1/books', book);

export default app;
