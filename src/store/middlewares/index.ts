import thunk from 'redux-thunk';

import apiMiddleware from './apiMiddleware';
import logger from './loggerMiddleware';

let middlewares = [thunk, apiMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

export default middlewares;
