import React, { Component } from 'react';
import './app.scss';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root';
import thunkMiddleware from "redux-thunk";
import NavigationBar from "./components/navigation_bar/NavigationBar";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./components/routes/Routes";

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

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