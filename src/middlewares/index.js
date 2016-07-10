import errorHandler from './errorHandler';
import bodyParser from 'body-parser';
import notFoundHandler from './notFound';
import nconf from 'nconf';
import morgan from 'morgan';
import {
  walkControllers,
} from '../libs/routes';
import express from 'express';
import path from 'path';

const IS_PROD = nconf.get('IS_PROD');
const ENABLED_REQUEST_LOGGING = nconf.get('ENABLE_REQUEST_LOGGING') === 'true';

const router = express.Router(); // eslint-disable-line babel/new-cap
walkControllers(router, path.join(__dirname, '/../controllers/'));

export default function attachMiddlewares (app) {
  if (!IS_PROD && ENABLED_REQUEST_LOGGING) app.use(morgan('dev'));

  // app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  app.use(router);
  app.use(notFoundHandler);

  // Error handler defined as the last middleware to catch all the errors
  app.use(errorHandler);
}