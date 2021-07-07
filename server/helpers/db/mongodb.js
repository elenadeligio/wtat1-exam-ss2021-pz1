const mongoose = require('mongoose');

const init = () => {
    // use this line to have the tests running against the dev db:
    // const dburl =  process.env.DB_URL
    // @shelf/jest-mongodb overwrites/sets process.env.MONGO_URL for tests:
    const dburl = process.env.MONGO_URL || process.env.DB_URL
  mongoose
    .connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.error('error: ' + err.stack);
      process.exit(1);
    });
  mongoose.connection.on('open', () => {
      // console.log('process.env.MONGO_URL: '+process.env.MONGO_URL)
      // console.log('process.env.DB_URL: '+process.env.DB_URL)
      console.log('connected to database on '+ dburl);
  });
};

mongoose.Promise = global.Promise;

module.exports = init;
