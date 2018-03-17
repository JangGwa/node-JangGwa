import React, { Component } from 'react';
import axios from 'axios';
import { Tag } from 'antd';
import { SERVER_HOST } from '../../constants'

class componentName extends Component {
  state = {
    topics: []
  }
  componentDidMount() {
    axios.get(`${SERVER_HOST}zhihu/topic`, { withCredentials: true }).then(res => {
      const data = res.data;
      let topics = [];
      if (data.success) {
        data.data.map(item => topics.push(item));
      }
      this.setState({ topics: topics });
    });
  }
  render() {
    return (
      <div>
        {this.state.topics.map((topic, index) => <Tag key={index}>{topic.name}</Tag>)}
      </div>
    );
  }
}

export default componentName;