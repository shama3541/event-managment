const tap = require("tap");
const supertest = require("supertest");
const app = require("../app");
const server = supertest(app);

const mockUser = {
  username: "alice",
  password: "password123",
  email: "alice@example.com",
  role: "organizer",
};
const mockUser2 = {
    "username": "Rashmi",
    "password": "password123",
    "email": "rashmi@example.com",
    "role": "attendee"
  }
const newevent = {
    "date": "2025-08-20",
  "time": "11:00",
  "description": "new event 5",
  "participants": []
}

const allEvents =[
    {
        "id": 584323,
        "date": "2025-04-20T00:00:00.000Z",
        "time": "18:00",
        "description": "new event 1"
    },
    {
        "id": 590584,
        "date": "2025-04-20T00:00:00.000Z",
        "time": "18:00",
        "description": "new event 2"
    },
    {
        "id": 598792,
        "date": "2025-04-20T00:00:00.000Z",
        "time": "18:00",
        "description": "new event 3"
    },
    {
        "id": 284488,
        "date": "2025-04-20T00:00:00.000Z",
        "time": "18:00",
        "description": "new event 4"
    }
]

let token = "";
let attendeeToken = "";
tap.test('POST /register', async (t) => {
      const response = await server.post('/register').send(mockUser);
      t.equal(response.statusCode, 200);
      t.equal(response.text, 'User Registered');
    })

tap.test("POST /login", async (t) => {
  const response = await server.post("/login").send({
    username: mockUser.username,
    password: mockUser.password,
  });
  t.equal(response.status, 200);
  t.hasOwnProp(response.body, "token");
  token = response.body.token;
  t.end();
});

tap.test("POST /login", async (t) => {
  const response = await server.post("/login").send({
    username: mockUser.username,
    password: "wrongpassword",
  });
  t.equal(response.status, 400);
  t.end();
});


//checking event creation

tap.test('GET /GetEvent',async(t)=>{
    const response= await server.get('/GetEvent').set('Authorization', `Bearer ${token}`);
    t.equal(response.statusCode, 200);
    t.same(response.body, allEvents);
    t.end();
})
tap.test('POST /CreateEvent',async(t)=>{
    console.log({token:token});
    const response= await server.post('/CreateEvent').set('Authorization', `Bearer ${token}`).send(newevent);
    t.equal(response.statusCode, 200);
    t.equal(response.text, 'Event Created');
    t.end();
})

//Event creation without organizer access

tap.test("POST /login", async (t) => {
    const response = await server.post("/login").send({
      username: mockUser2.username,
      password: mockUser2.password,
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, "token");
    attendeeToken = response.body.token;
    t.end();
  });
//createvent without organizer accesss
tap.test("POST /CreateEvent", async (t) => {
  const response = await server.post("/createEvent").set('Authorization',`Bearer ${attendeeToken}`).send(newevent);
  t.equal(response.statusCode, 403);
  t.end();
});

tap.test('PUT /UpdateEvent',async(t)=>{
    const response = await server.put('/UpdateEvent').set('Authorization', `Bearer ${token}`).send({
            "id": 42379,
            "date": "2025-04-15T00:00:00.000Z",
            "time": "12:00",
            "description": "1 on 1 meeting with the product manager.",
            "participants": [
                "Shamadeep@gmail.com"
            ]

})
    t.equal(response.statusCode, 200);
    t.equal(response.text, 'Event Updated');
    t.end();
})

tap.test('POST /deleteEvent',async(t)=>{
    const response = await server.delete('/deleteEvent').set('Authorization', `Bearer ${token}`).send({
        "id":590584})
    t.equal(response.statusCode, 200);
})

tap.test('POST /registerForEvent/',async(t)=>{
    const response = await server.post('/registerForEvent/284488').set('Authorization', `Bearer ${token}`).send({"email":mockUser2.username})
    t.equal(response.statusCode, 200);
})
tap.test('POST /registerForEvent/',async(t)=>{
    const response = await server.post('/registerForEvent/467367').set('Authorization', `Bearer ${token}`).send({
        "email":mockUser2.username})
    t.equal(response.statusCode, 200);
})


tap.test("GET /eventsRegistered", async (t) => {
  const response = await server
    .get("/eventsRegistered")
    .set("Authorization", `Bearer ${token}`);
  t.equal(response.statusCode, 200);
  t.same(response.body, event);
  t.end();
});


tap.teardown(() => {
    process.exit(0);
});
  
