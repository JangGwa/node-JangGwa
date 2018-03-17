import React, { Component } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import './Finance.less';

class Finance extends Component {
  state = {
    financeName: '',
    financePrice: 0,
  }
  componentDidMount() {
    this.fetchFinanceData ();
  }

  fetchFinanceData() {
    let that = this;
    axios.get('http://localhost:3000/fetchfinance')
    .then(function(response) {
      if (response.data.success) {
        let data = response.data.data.result[0];
        console.log('data', data.data)
        that.setState({
          financeName: data.data.name,
          financePrice: data.data.nowPri
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Card className="card-title" title="我的股票">
          <p>{this.state.financeName}</p>
          <p>{this.state.financePrice}</p>
        </Card>
      </div>
    );
  }
}

export default Finance;