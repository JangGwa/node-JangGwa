import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../containers/home/HomePage';
import loginComponent from '../containers/login/Login';
import zhihuLogin from '../containers/zhihu/ZhihuLogin';
import ZhihuTopic from '../containers/zhihu/ZhihuTopic';
import Finance from '../containers/finance/Finance';
import Film from '../containers/film/Film';
import Header from  '../components/header/Header'

class router extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route path="/home" component={HomePage}></Route>
            <Route path="/login" component={loginComponent}></Route>
            <Route path="/zhihu/login" component={zhihuLogin}></Route>
            <Route path="/zhihu/topic" component={ZhihuTopic}></Route>
            <Route path="/film" component={Film}></Route>
            <Route path="/finance" component={Finance}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default router;