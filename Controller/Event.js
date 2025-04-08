const Event = require('../Models/EventSchema');

async function GetEvent(req, res) {
    const role = req.user.role;
    if(role != "organizer"){
        return res.status(403).send("You are not authorized to view this page");
    }
    try{
        const events = await Event.find({},'id date time description participants');
        res.status(200).json(events);
    }catch(err){
        console.error(err);
        res.status(500).send("Error fetching events");
    }

}

async function CreateEvent(req, res) {
    const eventId = req.body.id;
    const eventDate = req.body.date;
    const eventTime = req.body.time;
    const eventDescription = req.body.description;
    const eventParticipants = req.body.participants;
    const role = req.user.role;
    if(role != "organizer"){
        return res.status(403).send("You are not authorized to view this page");
    }
    try {
        const newEvent = new Event({
            id: eventId,
            date: eventDate,
            time: eventTime,
            description: eventDescription,
            participants: eventParticipants
        });
        await newEvent.save();
        res.status(200).send("Event Created");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating event");
    }


}

async function UpdateEvent(req, res) {
    const id = req.body.id;
    const updateData = req.body;
    const role = req.user.role;
    if(role != "organizer"){
        return res.status(403).send("You are not authorized to view this page");
    }

    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { id: id },        
            updateData,          
            { new: true }       
        );

        if (!updatedEvent) {
            return res.status(404).send("Event not found");
        }

        res.status(200).send("Event Updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating event");
    }
}


async function DeleteEvent(req, res) {
    const id = req.body.id;
    const role = req.user.role;
    if(role != "organizer"){
        return res.status(403).send("You are not authorized to view this page");
    }

    try {
        const deletedEvent = await Event.findOneAndDelete({ id: id });

        if (!deletedEvent) {
            return res.status(404).send("Event not found");
        }

        res.status(200).send("Event Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting event");
    }
}

async function RegisterForEvent(req, res) {
    const { id, email } = req.body;
  
    try {
      const updatedEvent = await Event.findOneAndUpdate(
        { id: id },
        { $push: { participants: email } },
        { new: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).send("Event not found");
      }
  
      res.status(200).send("Registered for event");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error registering for event");
    }
  }
  
module.exports = { CreateEvent,UpdateEvent,GetEvent,DeleteEvent,RegisterForEvent};

