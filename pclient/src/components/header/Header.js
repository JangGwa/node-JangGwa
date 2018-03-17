import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import './Header.less';
import riduLogo from '../../constants/image/ridu_logo.png';

const Search = Input.Search;

class componentName extends Component {
  render() {
    return (
      <div className="header-container">
        <header className="header-top">
          <div className="flex-row">
            <img className="img-logo" src={riduLogo} alt="" />
            <div className="main-nav">
              <Link to="/home">首页</Link>
              <Link to="/zhihu/topic">知乎</Link>
              <Link to="/finance">股票</Link>
              <Link to="/film">影片</Link>
            </div>
          </div>
          <div>
            <div className="header-btn">登录</div>
            <div className="header-btn">注册</div>
          </div>
        </header>
        <div className="header-content">
          <h1 className="desc">日读，让你一眼看遍心中事</h1>
          <Search className="input" placeholder="搜索你喜欢的" />
          <div className="tip">热门搜索：股票 影视 知乎 股票 影视 知乎 股票 影视 知乎</div>
        </div>
      </div>
    );
  }
}

export default componentName;