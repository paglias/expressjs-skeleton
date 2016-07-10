import express from 'express';
import http from 'http';

// Use require for all custom modules so that
// we can safely setup nconf before anything else is done
const nconf = require('./libs/setupNconf').default();
const logger = require('./libs/logger').default;

const PORT = nconf.get('PORT');

const server = http.createServer();
const app = express();

app.set('port', PORT);

require('./middlewares').default(app);

server.on('request', app);
server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}.`);
});

export default server;