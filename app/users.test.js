const request = require('supertest');
const app     = require('./app');
const mongoose = require('mongoose');


const prova = {
  err1: 'Make the password longer. ',
  err2: 'Use both lowercase and uppercase letters. ',
  err3: 'Include at least one number. ',
  err4: 'Include at least one special character. '
};

describe('GET /api/v1/users', () => {

  let userSpy;
  let userSpyFindById;

  beforeAll( () => {
    const User = require('./models/user');
    userSpy = jest.spyOn(User, 'find').mockImplementation((criterias) => {
      return [{
        id: "646238b39741945424b75b7b",
        email: 'hamzaoui.h01@gmail.com'
      }];
    });
    userSpyFindById = jest.spyOn(User, 'findById').mockImplementation((id) => {
      if (id=="646238b39741945424b75b7b")
        return {
          id: "646238b39741945424b75b7b",
          email: 'hamzaoui.h01@gmail.com'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    userSpy.mockRestore();
    userSpyFindById.mockRestore();
  });
  
  test('GET /api/v1/users should respond with an array of users', async () => {
    return request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(res.body && res.body[0]) {
          expect(res.body[0]).toEqual({
            self: '/api/v1/users/646238b39741945424b75b7b',
            email: 'hamzaoui.h01@gmail.com'
          });
        }
      });
  });

  test('GET /api/v1/users/:id should respond with json', async () => {
    return request(app)
      .get('/api/v1/users/646238b39741945424b75b7b')
      .expect('Content-Type', /json/)
      .expect(200, {
          self: '/api/v1/users/646238b39741945424b75b7b',
          email: 'hamzaoui.h01@gmail.com'
        });
  });

});

describe('POST /api/v1/users', () => {
  const User = require('./models/user');
  

  let savedUser = {
    nomeCognome: 'Prova Testing',
    email: 'provatesting@gmail.com',
    telefono: '9098765430',
    password: 'Password123/',
    checkPassword: 'Password123/'
  };

  let finalUser = {
    nomeCognome: "Gigi d'Alessio",
    email: 'gigidalessio@gmail.com',
    telefono: '1234567891',
    password: 'Trekse1/',
    checkPassword: 'Trekse1/'
  };

  beforeAll(async () => {
    let connection;
    let newUser;
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = mongoose.connect('mongodb+srv://andreivoinea:nNtbdh6ZTWB9Xclr@treksec1.lfljmoa.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Database connected!');
    newUser = User.create(savedUser);

    const email = 'gigidalessio@gmail.com';

    try {
      const deletedUser = await User.findOneAndDelete({ email });
      if (deletedUser) {
        console.log('Deleted User:', deletedUser);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error(error);
    }
  });

  afterAll( async () => {
    const email = 'provatesting@gmail.com';
    try {
      const deletedUser = await User.findOneAndDelete({ email });
      if (deletedUser) {
        console.log('Deleted User:', deletedUser);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error(error);
    }

    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  test('user already registered', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(savedUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409, {error: 'User already exists.'});
    
  });

  test('nome vuoto', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "",
        email: "",
        telefono: "",
        password: "",
        checkPassword: ""
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorNome: 'Insert a name and a surname.'})
  });

  test('telefono vuoto', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: "",
        telefono: "",
        password: "",
        checkPassword: "" 
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorTelefono: 'Insert a mobile number.'})
  });

  test('email vuota', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: "",
        telefono: "1234567891",
        password: "",
        checkPassword: ""
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorEmail: 'Insert an email.'})

  });

  test('password vuota', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: "gigidalessio@gmail.com",
        telefono: "1234567891",
        password: "",
        checkPassword: ""
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorsPassword: 'Insert a valid password.'})
  });

  

  test('nome non valido', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: 'Gigi09',
        email: 'gigidalessio@gmail.com',
        telefono: '1234567891',
        password: 'Trekse1/',
        checkPassword: 'Trekse1/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorNome: 'Insert only letters.'})

  });

  test('telefono non valido', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '1342easd12',
        password: 'Trekse1/',
        checkPassword: 'Trekse1/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorTelefono: 'Insert only digits.'})

  });


  test('telefono lungo', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '12345678903',
        password: 'Trekse1/',
        checkPassword: 'Trekse1/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorTelefono: 'Insert 10 digits.'})
    
  });

  test('telefono corto', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '123456789',
        password: 'Trekse1/',
        checkPassword: 'Trekse1/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorTelefono: 'Insert 10 digits.'})
    
  });


  test('email non valida [@]', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessiogmail.com',
        telefono: '1234567891',
        password: 'Trekse1/',
        checkPassword: 'Trekse1/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorEmail: 'Not a valid email.'})
    
  });


  test('email non valida [.]', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail',
        telefono: '1234567891',
        password: 'Trekse1/',
        checkPassword: 'Trekse1/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorEmail: 'Not a valid email.'})
    
  });

  test('password non valida', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '1234567891',
        password: 'trek',
        checkPassword: 'trek'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(400);
    expect(response.body.errorsPassword).toContain(prova.err1);
    expect(response.body.errorsPassword).toContain(prova.err2);
    expect(response.body.errorsPassword).toContain(prova.err3);
    expect(response.body.errorsPassword).toContain(prova.err4);
    
  });


  test('password non valida2', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '1234567891',
        password: 'trek12',
        checkPassword: 'trek12'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(400);
    expect(response.body.errorsPassword).toContain(prova.err1);
    expect(response.body.errorsPassword).toContain(prova.err2);
    expect(response.body.errorsPassword).toContain(prova.err4);

  });

  test('password non valida3', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '1234567891',
        password: 'Trek12',
        checkPassword: 'Trek12'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(400);
    expect(response.body.errorsPassword).toContain(prova.err1);
    expect(response.body.errorsPassword).toContain(prova.err4);
    
  });

  test('password non valida4', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '1234567891',
        password: 'Trek12/',
        checkPassword: 'Trek12/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(400);
    expect(response.body.errorsPassword).toContain(prova.err1);

  });

  test('password e checkPassword non concordi', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        nomeCognome: "Gigi d'Alessio",
        email: 'gigidalessio@gmail.com',
        telefono: '1234567891',
        password: 'Treksec12/',
        checkPassword: 'Treksec12'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {errorCheck: 'Passwords do not match.'});
  });

  test('should create a new user', async () => {
  
    const response = await request(app)
      .post('/api/v1/users')
      .send(finalUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
    
  });
  
});
