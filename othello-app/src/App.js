import React, { Component } from 'react';
import './app.scss';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root';
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import Index from './views/index';
import NavigationBar from "./components/navigation_bar/NavigationBar";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./components/routes/Routes";

// var middlewares = [];
// const loggerMiddleware = createLogger({
//   level: 'info',
//   collapsed: true,
// });
//
// middlewares.push(thunkMiddleware);
// middlewares.push(loggerMiddleware);
//
// const composeEnhancer = compose;
export const store = createStore(rootReducer);

export function app(props) {
  return (<Provider store={store}>
      <Router>
        <div>
        <NavigationBar />
          <Routes />
        </div>
        </Router>
    </Provider>
  );
};

export default app;