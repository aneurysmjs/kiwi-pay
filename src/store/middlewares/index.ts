import thunk from 'redux-thunk';

import apiMiddleware from './apiMiddleware';
import logger from './loggerMiddleware';

const middlewares = [thunk, apiMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export default middlewares;
