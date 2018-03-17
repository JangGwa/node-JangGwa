import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import '../login/Login.less';
import { SERVER_HOST, LOCAL_HOST } from '../../constants'

const FormItem = Form.Item;

class Login extends Component {
  state = {
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
          axios.get(`${SERVER_HOST}getCaptcha`, { responseType: 'blob', withCredentials: true})
            .then(res => {
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
    axios.post(`${SERVER_HOST}zhihu/login`, {
      _xsrf: this.state.xsrf,
      phone_num: this.state.nameInput,
      password: this.state.pwdInput,
      captcha: this.state.captchaInput,
    }, {withCredentials: true})
    .then(function (response) {
      let data = response.data.data;
      if (data.r === 0) {
        window.location.href = `${LOCAL_HOST}zhihu/topic`
      } else {
        alert(data.msg)
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
        <h1 className="login-title" style={{ marginBottom: 24 }}>知乎</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" onChange={event => this.setState({nameInput: event.target.value})} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" onChange={event => this.setState({pwdInput: event.target.value})} />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                  <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Captcha" onChange={event => this.setState({captchaInput: event.target.value})} />
                  )}
              </Col>
              <Col span={12} style={{ height: 50, marginTop: -9 }}>
                <img alt="" src={this.state.srcImg} style={{ width: '100%', height: '100%' }} />
              </Col>
            </Row>
          </FormItem>
        </Form>
        <Button className="login-button" type="primary" onClick={this.handleLogin}>登录</Button>
      </div>
    );
  }
}

export default Form.create()(Login);
