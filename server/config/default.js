module.exports = {
  url: 'mongodb://localhost:27017/ridu',
  session: {
    name: 'sid',
    secret: 'sid',
    cookie: {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
}