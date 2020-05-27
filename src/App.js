import React, { Component } from 'react';
import './App.css';

class App extends Component {
  foo = () => 'Bars';

  render() {
    const name = 'Tihomir Bogajcevic';
    const loading = false;

    // if (loading) {
    //   return <h4>Loading...</h4>;
    // }

    const showName = true;

    return (
      <div className='App'>
        {loading ? <h4>Loading...</h4> : <h1>Hello {showName && name}</h1>}
      </div>
    );
  }
}

export default App;
