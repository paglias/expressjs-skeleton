import fs from 'fs';

// Wrapper function to handler `async` route handlers that return promises
// It takes the async function, execute it and pass any error to next (args[2])
let _wrapAsyncFn = fn => (...args) => fn(...args).catch(args[2]);
let noop = (req, res, next) =>  next();

export function readController (router, controller) {
  for (let actionName in controller) {
    let {method, url, middlewares = [], handler} = controller[actionName];

    // List of middlewares to add to all routes
    let middlewaresToAdd = [];
    middlewares.unshift(...middlewaresToAdd);

    method = method.toLowerCase();
    let fn = handler ? _wrapAsyncFn(handler) : noop;

    router[method](url, ...middlewares, fn);
  }
}

export function walkControllers (router, filePath) {
  fs
    .readdirSync(filePath)
    .forEach(fileName => {
      if (!fs.statSync(filePath + fileName).isFile()) {
        walkControllers(router, `${filePath}${fileName}/`);
      } else if (fileName.match(/\.js$/)) {
        let controller = require(filePath + fileName).default; // eslint-disable-line global-require
        readController(router, controller);
      }
    });
}
