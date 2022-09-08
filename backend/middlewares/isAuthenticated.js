const isAuthenticated = (req, res, next) => {
    const user = req.session.username
    if (user === '' || user === undefined) {
      next(new Error('invalid session'))
    } else {
      next()
    }
  }
  
  module.exports = isAuthenticated