import React                    from 'react';
import configureStore           from './store';
import ReactDOM                 from 'react-dom';
import '../resources/static/app.scss';
import Index from './views/index';
import {Provider} from 'react-redux';
const store  = configureStore;
const target = document.getElementById('react');

if (target != null) {
    ReactDOM.render(<Provider store={store}>
        <Index />
    </Provider>, target);
}