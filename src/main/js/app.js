import { createBrowserHistory } from 'history';
import React                    from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore           from './store';
import ReactDOM                 from 'react-dom';
import Root                     from './container/root';
import '../resources/static/app.scss';
import Index from './views/index';
import {Provider} from 'react-redux';
const browserHistory = createBrowserHistory();
const store  = configureStore;
const history = syncHistoryWithStore(browserHistory, store);

const target = document.getElementById('react');

if (target != null) {
    // const node = <Root routerHistory={history} store={store}/>;
    // const node = <Index />
    // ReactDOM.render(node, target);

    ReactDOM.render(<Provider store={store}>
        <Index />
    </Provider>, target);
}