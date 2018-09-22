// import React                    from 'react';
// import configureStore           from './store';
// import ReactDOM                 from 'react-dom';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { browserHistory } from 'react-router';
// import '../resources/static/app.scss';
// import Index from './views/index';
// import {Provider} from 'react-redux';
// const store  = configureStore;
// const target = document.getElementById('react');
//
// const history = syncHistoryWithStore(browserHistory, store);
// if (target != null) {
//     ReactDOM.render(<Provider store={store}>
//         <Index history={history}/>
//     </Provider>, target);
// }

import '../resources/static/app.scss';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import rootReducer from './reducers/root';
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import Index from './views/index';

const history = createBrowserHistory();
var middlewares = [];
const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
});

middlewares.push(thunkMiddleware);
middlewares.push(loggerMiddleware);

const composeEnhancer = compose;
export const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(
        applyMiddleware(
            ...middlewares,routerMiddleware(history),
        ),
    ),
);


ReactDOM.render(
            <Provider store={store}>
                <Index history={history} />
            </Provider>,
        document.getElementById('react')
);