const express= require('express');
const router= express.Router();
const {RegisterUser,LoginUser}= require('../Controller/User');
const {verifyToken}= require('../Middleware/Middleware');
const {CreateEvent,UpdateEvent,GetEvent,DeleteEvent,RegisterForEvent}= require('../Controller/Event');

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.post('/createEvent',verifyToken,CreateEvent);
router.put('/updateEvent',verifyToken,UpdateEvent);
router.get('/getEvent',verifyToken,GetEvent);
router.delete('/deleteEvent',verifyToken,DeleteEvent);
router.post('/registerForEvent',RegisterForEvent);

module.exports= router;

