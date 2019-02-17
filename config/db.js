if( process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://heroku_qv4j7xsq:d42jdp3suthv0d8gsdcin2rtjl@ds337985.mlab.com:37985/heroku_qv4j7xsq'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost:27017/video-app'
  }
}
