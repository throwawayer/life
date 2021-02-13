# Prerequisities
- [Node.js](https://nodejs.org/en/) installed (latest LTS recommended)

# Development

1. Install dependencies:
```
npm install
```
2. Run the project in development mode:
```
npm start
```
3. Build the project in production mode:
```
npm run build
```
4. Run the project in production mode:
```
npm run prod
```

Will start webpack development server on ```localhost:3000``` with [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) enabled. Port is configurable via webpack development config (./webpack/dev.config.js).

# Environment variables

- ```NODE_ENV``` - Either "development" or "production".

# Live demo

- ```[Demo](https://throwawayer.github.io/life/)``` - link to the demo.
