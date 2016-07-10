import nconf from 'nconf';
import { join, resolve } from 'path';

const PATH_TO_CONFIG = join(resolve(__dirname, '../../config.json'));

let isNconfSetup = false;

export default function setupNconf () {
  if (isNconfSetup) return nconf;

  isNconfSetup = true;

  nconf
    .argv()
    .env()
    .file('user', PATH_TO_CONFIG);

  nconf.set('IS_PROD', nconf.get('NODE_ENV') === 'production');
  nconf.set('IS_DEV', nconf.get('NODE_ENV') === 'development');
  nconf.set('IS_TEST', nconf.get('NODE_ENV') === 'test');

  return nconf;
}
