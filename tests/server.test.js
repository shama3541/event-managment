const tap = require("tap");
const supertest = require("supertest");
const app = require("../app");
const server = supertest(app);

const organizer = {
    username: "organizer_test_user",
    password: "password123",
    email: "organizer@example.com",
    role: "organizer",
  };
  const attendee = {
    username: "attendee_test_user",
    password: "password123",
    email: "attendee@example.com",
    role: "attendee",
  };
  
  let organizerToken = "";
  let attendeeToken = "";
  let createdEventId = "";
  
  tap.test("Register organizer and attendee", async (t) => {
    await server.post("/register").send(organizer);
    await server.post("/register").send(attendee);
    t.pass("Users registered");
    t.end();
  });
  
  tap.test("Login organizer and attendee", async (t) => {
    const res1 = await server.post("/login").send({
      username: organizer.username,
      password: organizer.password,
    });
    organizerToken = res1.body.token;
    t.ok(organizerToken, "Organizer token retrieved");
  
    const res2 = await server.post("/login").send({
      username: attendee.username,
      password: attendee.password,
    });
    attendeeToken = res2.body.token;
    t.ok(attendeeToken, "Attendee token retrieved");
    t.end();
  });
  
  tap.test("Create event as organizer", async (t) => {
    const newEvent = {
      date: "2025-08-20",
      time: "11:00",
      description: "Dynamic Test Event",
      participants: [],
    };
  
    const response = await server
      .post("/createEvent")
      .set("Authorization", `Bearer ${organizerToken}`)
      .send(newEvent);
  
    t.equal(response.statusCode, 200, "Event created successfully");
    const eventsRes = await server
      .get("/getEvent")
      .set("Authorization", `Bearer ${organizerToken}`);
    const createdEvent = eventsRes.body.find(
      (e) => e.description === newEvent.description
    );
    createdEventId = createdEvent?.id;
    t.ok(createdEventId, "Stored created event ID");
    t.end();
  });
  
  tap.test("Fail to create event as attendee", async (t) => {
    const response = await server
      .post("/createEvent")
      .set("Authorization", `Bearer ${attendeeToken}`)
      .send({
        date: "2025-08-22",
        time: "15:00",
        description: "Attendee shouldn't create this",
        participants: [],
      });
  
    t.equal(response.statusCode, 403, "Attendee blocked from creating event");
    t.end();
  });
  
  tap.test("Update event as organizer", async (t) => {
    const response = await server
      .put("/updateEvent")
      .set("Authorization", `Bearer ${organizerToken}`)
      .send({
        id: createdEventId,
        date: "2025-08-21",
        time: "14:00",
        description: "Updated Test Event",
        participants: [],
      });
  
    t.equal(response.statusCode, 200, "Event updated");
    t.equal(response.text, "Event Updated");
    t.end();
  });
  
  tap.test("Register attendee for event", async (t) => {
    const response = await server
      .post(`/registerForEvent/${createdEventId}`)
      .set("Authorization", `Bearer ${organizerToken}`)
      .send({ email: attendee.email });
  
    t.equal(response.statusCode, 200, "Attendee registered");
    t.end();
  });
  
  tap.test("Get registered events as attendee", async (t) => {
    const response = await server
      .get("/eventsRegistered")
      .set("Authorization", `Bearer ${attendeeToken}`);
  
    t.equal(response.statusCode, 200, "Got registered events");
    t.ok(Array.isArray(response.body), "Response is an array");
  
    if (response.body.length === 0) {
      t.fail("Attendee not registered for any events");
    } else {
      const event = response.body.find((e) => e.id === createdEventId);
      t.ok(event, `Event ID ${createdEventId} found in attendee's list`);
    }
  
    t.end();
  });
  
  tap.test("Delete event", async (t) => {
    const response = await server
      .delete("/deleteEvent")
      .set("Authorization", `Bearer ${organizerToken}`)
      .send({ id: createdEventId });
  
    t.equal(response.statusCode, 200, "Event deleted");
    t.end();
  });
  
  tap.teardown(() => {
    process.exit(0);
  });