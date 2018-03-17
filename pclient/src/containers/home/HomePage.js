import React, { Component } from 'react';
import './HomePage.less';
import Finance from '../finance/Finance'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Finance />
      </div>
    );
  }
}

export default HomePage;