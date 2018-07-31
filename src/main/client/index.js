import React from 'react';
import { render } from 'react-dom';
import TablesList from './mapping/components/TablesList.js';
import { Provider } from 'react-redux';
import reducers from './Reducers';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(reduxThunk));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TablesList />
            </Provider>
        );
    }
}

render(<App/>, document.getElementById('app'));
