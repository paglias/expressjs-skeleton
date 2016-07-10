# ExpressJS Skeleton App

### Requirements
- node >= 6
- npm >= 3

### Usage
- Clone the repo
- `cp config.json.example config.json`

### Features
- Written in ES6
- async / await and ES6 modules support with BabelJS
- ESLint
- winston.js for logging
- nconf to manage configuration
- Custom error handler
- Includes only some middlewares (body-parser and morgan for development logging of requests)
- Automatic restarts on file change with Nodemon

### Commands
- `npm start`
- `npm start-watch`
- `npm start-production`
- `npm run build`
- `npm run build-watch`
- `npm run lint`

### TODO
- [ ] gzip?
- [ ] cluster support (or pm2)
- [ ] standard response format
- [ ] uncaughtException / domains
- [ ] only disable error logs in prod (not other logs)
- [x] prevent multiple calls to `setupNconf`