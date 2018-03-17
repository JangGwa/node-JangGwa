import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_HOST } from '../../constants'
import './Film.less'

class Film extends Component {
  state = {
    tv: []
  }
  componentDidMount() {
    axios.get(`${SERVER_HOST}film/tv`).then(res => {
      if (res.data.success) {
        this.setState({tv: res.data.data});
      }
    })
  }
  render() {
    return (
      <div className="film-container">
        {this.state.tv.map((item, index) => 
          <div className="item-film" key={`${item}-${index}`}>
            <img src={item.img} className="img-film" alt="filmImg" />
            <div className="item-content">
              <span className="title">{item.title}</span>
              <span className="score">{item.score}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Film;