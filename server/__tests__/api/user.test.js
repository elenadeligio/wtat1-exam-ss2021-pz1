const { app, request, User } = require('../commonJest')

describe('API: user list', () => {
    const userData = [{name: "Tick", age: 10},{name: "Trick", age: 11},{name: "Track", age: 12}];

    beforeAll( done => {
        User.insertMany(userData, (err, docs) =>{
            done()
        })
    })

    it('show all users in db', function (done) {
        request(app)
            .get('/api/users')
            .then((response) => {
                const body = response.text
                for (const user of userData) {
                    expect(body).toContain(user.name)
                }
                done()
            })
            .catch((err) =>{
                done(err)
            })
    })
    describe('POST /users', function() {
        it('responds with json', function(done) {
            request(app)
                .post('/api/users')
                .send({name: 'kim', age: '42'})
                .set('Accept', 'application/json')
               // .expect('Content-Type', /json/)
                .expect(201) // Created
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).toEqual('kim')
                    return done();
                });
        });
    });

})
