import React from 'react';
import {render} from 'react-dom';
import TablesList from './components/TablesList.js';

class App extends React.Component {
  render() {
      return (
         <TablesList />
      );
    }
}

render(<App/>, document.getElementById('app'));