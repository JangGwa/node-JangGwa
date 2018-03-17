<template>
<div className="login-container">
  <h1 className="login-title">日读</h1>
  <div className="login-desc">让你一眼看遍心中事</div>
  <div className="nav-slider">
    <div className={classNames({selected: this.state.currentNav === '注册'})} onClick={() => this.setState({currentNav: '注册'})}>注册</div>
    <div className={classNames({selected: this.state.currentNav === '登录'})} onClick={() => this.setState({currentNav: '登录'})}>登录</div>
  </div>
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
  </Form>
  <Button type="primary" className="login-button" onClick={this.login}>{this.state.currentNav}</Button>
</div>
</template>

<script>

</script>

<style lang="stylus" scoped>

</style>

