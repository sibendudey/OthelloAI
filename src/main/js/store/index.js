import { createStore, applyMiddleware } from 'redux';
import createLogger                     from 'redux-logger';
import thunkMiddleware                  from 'redux-thunk';
import { routerMiddleware }             from 'react-router-redux';
import reducers                         from  '../reducers/root';


var middlewares = [];
const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

middlewares.push(thunkMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(reducers);

// export default function configureStore(browserHistory) {
//   const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
//   return createStoreWithMiddleware(reducers);
// }
