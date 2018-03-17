import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import classNames from 'classnames';
import axios from 'axios';
import './Login.less';
import { SERVER_HOST, LOCAL_HOST } from '../../constants'

const FormItem = Form.Item;

class Login extends Component {
  state = {
    currentNav: '登录', //切换登陆注册 nav
    nameInput: '',
    pwdInput: '',
    captchaInput: '',
    xsrf: '',
    srcImg: ''
  }
  componentDidMount() {
    const that = this;
    axios.get(`${SERVER_HOST}init`, { withCredentials: true })
      .then(function (res) {
        if (res.data.success) {
          axios.get(`${SERVER_HOST}getCaptcha`, { responseType: 'blob', withCredentials: true }).then(res => {
            var reader = new window.FileReader();
            reader.readAsDataURL(res.data);
            reader.onload = function () {
              var imageDataUrl = reader.result;
              that.setState({ srcImg: imageDataUrl })
            }
          })
        }
      })
  }
  handleLogin = () => {
    if (this.state.currentNav === '注册') {
      this._register();
    } else {
      this._login();
    }
  }
  _login() {
    const { captchaInput, nameInput, pwdInput } = this.state;
    if (captchaInput && nameInput && pwdInput) {
      axios.post(`${SERVER_HOST}login`, {
        username: this.state.nameInput,
        password: this.state.pwdInput
      }, { withCredentials: true })
        .then(function (response) {
          let data = response.data;
          if (data.success) {
            window.location.href = `${LOCAL_HOST}home`
          } else {
            alert(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert('参数错误');
    }
  }
  _register() {
    axios.post(`${SERVER_HOST}register`, {
      username: this.state.nameInput,
      password: this.state.pwdInput
    })
      .then(function (response) {
        let data = response.data;
        if (data.success) {
          window.location.href = `${LOCAL_HOST}home`
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <h1 className="login-title">日读</h1>
        <div className="login-desc">让你一眼看遍心中事</div>
        <div className="nav-slider">
          <div className={classNames({ selected: this.state.currentNav === '注册' })} onClick={() => this.setState({ currentNav: '注册' })}>注册</div>
          <div className={classNames({ selected: this.state.currentNav === '登录' })} onClick={() => this.setState({ currentNav: '登录' })}>登录</div>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" onChange={event => this.setState({ nameInput: event.target.value })} />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" onChange={event => this.setState({ pwdInput: event.target.value })} />
              )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                  <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Captcha" onChange={event => this.setState({ captchaInput: event.target.value })} />
                  )}
              </Col>
              <Col span={12} style={{ height: 50, marginTop: -9 }}>
                <img alt="" src={this.state.srcImg} style={{ width: '100%', height: '100%' }} />
              </Col>
            </Row>
          </FormItem>
        </Form>
        <Button className="login-button" type="primary" onClick={this.handleLogin}>{this.state.currentNav}</Button>
      </div>
    );
  }
}

export default Form.create()(Login);
