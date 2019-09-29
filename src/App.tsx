// @flow strict
import React, { Component } from 'react';

import Header from '~components/common/Header';
import Home from '~components/pages/Home';

import './assets/scss/styles.scss';

class App extends Component {
  render() {
    return (
      <section>
        <Header />
        <Home />
      </section>
    );
  }
}

export default App;
