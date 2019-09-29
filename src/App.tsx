// @flow strict
import React, { Component } from 'react';

import Header from '~components/Header';

import './assets/scss/styles.scss';

class App extends Component {
  render() {
    return (
      <section>
        <Header />
        <div className="mt-3">
          <h1 className="text-center">My dashboard</h1>
        </div>
      </section>
    );
  }
}

export default App;
