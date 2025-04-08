const tap = require('tap');
const supertest = require('supertest');
const app = require('../app'); 
const server = supertest(app);

const mockUser= {
    "username":"shamminewadmin",
    "password":"password",
    "email":"shamminewadmin@gmail.com",
    "role":"organizer"
}
const mockUser2={
    "username":"attendee1",
    "password":"password",
    "email":"newattendee@gmail.com",
    "role":"attendee"
}
const event=[
    {
        "_id": "67f0cee17823c48082a3d04f",
        "id": 1,
        "date": "2025-04-10T00:00:00.000Z",
        "time": "17:30",
        "description": "test patch",
        "participants": [
            "alice@example.com"
        ]
    },
    {
        "_id": "67f0d55d61aaca32d1462616",
        "id": 2,
        "date": "2025-04-15T00:00:00.000Z",
        "time": "11:00",
        "description": "Strategy session for the upcoming product launch.",
        "participants": [
            "launchlead@example.com",
            "marketing@example.com",
            "devteam@example.com",
            "Shamadeep@gmail.com"
        ]
    }
]

let token=''
//checking registration
// tap.test('POST /register', async (t) => {
//   const response = await server.post('/register').send(mockUser);
//   t.equal(response.statusCode, 200);
//   t.equal(response.text, 'User Registered');
// })
//login with password
tap.test('POST /login', async (t) => {
  const response = await server.post('/login').send({
    username: mockUser2.username,
    password: mockUser2.password,
  });
  t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
    t.end();
});

tap.test('POST /login', async (t) => {
    const response = await server.post('/login').send({
      username: mockUser.username,
      password: "wrongpassword",
    });
    t.equal(response.status, 400);
      t.end();
  });

//login with wrong password

//checking event creation
const eventData = {
    id:"5",
    date: "2023-10-01",
    time: "10:00 AM",
    description: "Test Description",
    participants: [],
  };

// tap.test('GET /GetEvent',async(t)=>{
//     const response= await server.get('/GetEvent').set('Authorization', `Bearer ${token}`);
//     t.equal(response.statusCode, 200);
//     t.same(response.body, event);
//     t.end();
// })
// tap.test('POST /CreateEvent',async(t)=>{
//     console.log({token:token});
//     const response= await server.post('/CreateEvent').set('Authorization', `Bearer ${token}`).send(eventData);
//     t.equal(response.statusCode, 200);
//     t.equal(response.text, 'Event Created');
//     t.end();
// })

// tap.test('PUT /UpdateEvent',async(t)=>{
//     const response = await server.put('/UpdateEvent').set('Authorization', `Bearer ${token}`).send({    
//             "_id": "67f0d55d61aaca32d1462616",
//             "id": 2,
//             "date": "2025-04-15T00:00:00.000Z",
//             "time": "12:00",
//             "description": "1 on 1 meeting with the product manager.",
//             "participants": [
//                 "Shamadeep@gmail.com"
//             ]
        
// })
//     t.equal(response.statusCode, 200);
//     t.equal(response.text, 'Event Updated');
//     t.end();
// })

// tap.test('POST /deleteEvent',async(t)=>{
//     const response = await server.delete('/deleteEvent').set('Authorization', `Bearer ${token}`).send({
//         "id":1})
//     t.equal(response.statusCode, 200);
// })

tap.test('POST /registerForEvent',async(t)=>{
    const response = await server.post('/registerForEvent').set('Authorization', `Bearer ${token}`).send({
        "id":2,"email":mockUser2.email })
    t.equal(response.statusCode, 200);
})

tap.teardown(() => {
    process.exit(0);
});