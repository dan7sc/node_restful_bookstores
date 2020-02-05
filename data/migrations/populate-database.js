import db from '../database-setup';
import Customer from '../../src/models/customer';
import Bookstore from '../../src/models/bookstore';
import Book from '../../src/models/book';
import fs from 'fs';
import path from 'path';

const dir = path.dirname(__dirname + '/.');
