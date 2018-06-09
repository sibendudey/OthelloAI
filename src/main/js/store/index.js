import { createStore, applyMiddleware } from 'redux';
import createLogger                     from 'redux-logger';
import thunkMiddleware                  from 'redux-thunk';
import reducers                         from  '../reducers/root';


var middlewares = [];
const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

middlewares.push(thunkMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(reducers);