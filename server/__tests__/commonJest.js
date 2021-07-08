process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
afterAll(async () => {
    await mongoose.connection.close()
})

module.exports = {
    app: require('../server'),
    User: require('../models/user'),
    request: require('supertest')
}