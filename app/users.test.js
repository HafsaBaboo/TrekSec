/**
 * https://www.npmjs.com/package/supertest
 */
const jwt = require("jsonwebtoken");


    test('should send a mail to the user user', async () => {
 
    const response = await request(app)
      .post('/api/v1/users/reset-password')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '1234567891',
        password: 'Trekse1/',
        checkPassword: 'Trekse1/',
        chx: true
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, {error: 'Mail sended'})
   
  });      

  test('should not send a mail to the user', async () => {
 
    const response = await request(app)
      .post('/api/v1/users/reset-password')
      .send({
          email: 'gigidalessiogmail.com',
          password: 'Trekse1/',
        }
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, {error: 'Email not found'})

  });


describe('PUT /api/v1/users/', () => {
  const User = require('./models/user');
    
  let passNotStrong = {
    email: 'hamzaoui.h01@gmail.com',
    newPassword: 'ciao',
    newcheckPassword: 'ciao'
  };

  let passNotMatch = {
    email: 'hamzaoui.h01@gmail.com',
    newPassword: 'ciaoComeStai_3',
    newcheckPassword: 'ciaoComeSti_3'
  };

  let updateUser = {
    email: 'hamzaoui.h01@gmail.com',
    newPassword: 'ciaoComeStai-27',
    newcheckPassword: 'ciaoComeStai-27',
    token : jwt.sign({email: 'hamzaoui.h01@gmail.com'}, 'mysecret', {expiresIn: "10m"})
  };

  

  beforeAll(async () => {
    let connection;
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = mongoose.connect('mongodb+srv://andreivoinea:nNtbdh6ZTWB9Xclr@treksec1.lfljmoa.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Database connected!');
  });

  afterAll( async () => {
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  test('password not stong', async () => {

    const response = await request(app)
      .put('/api/v1/users/reset-password')
      .send(passNotStrong)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {error: 'Password not stong enough'});
    
  });

  test('password not matching', async () => {

    const response = await request(app)
    .put('/api/v1/users/reset-password')
      .send(passNotMatch)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {error: 'Passwords do not match.'});
    
  }); 

  test('update password', async () => {
    
    return request(app)
      .put('/api/v1/users/reset-password')
      .set('x-access-token', updateUser.token)
      .set('Accept', 'application/json')
      .send(updateUser)
      .expect('Content-Type', /json/)
      .expect(201, {error: "User updated"});
    
  });
});
