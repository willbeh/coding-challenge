let events = require('../data/data.json');
const { v4: uuidv4 } = require('uuid');
const typeorm = require('typeorm');

events = events.sort((a, b) => a.organizer.name.localeCompare(b.organizer.name));

async function process() {
  const connection = await typeorm.createConnection({
    type: "sqlite",
    database: "./data/myDb.db",
    logging: false,
    synchronize: false,
    entities: [
      __dirname + "/entities/*.js"
    ]
  });

  const userRepository = connection.getRepository("User");
  const eventRepository = connection.getRepository("Event");

  let user = {name: ''};
  for(const event of events) {
    if (checkData(event) !== true) {
      console.log('Error: ', checkData(event));
      console.log('row: ', event);
    }

    if(user.name !== event.organizer.name) {
      user = await userRepository.save({
        id: uuidv4(),
        name: event.organizer.name,
      })

      console.log('creating user', user)
    }

    await eventRepository.save({
      name: event.name,
      isOutside: event.isOutside,
      location: event.location,
      date: event.date,
      organizer: user
    })

    console.log('created event', event.name)
  }
}

function checkData(event) {
  if(!event.name) {
    return 'No event name found';
  }

  if(typeof event.isOutside !== "boolean") {
    return 'No isOutside found';
  }

  if(!event.location) {
    return 'No location found';
  }

  const tempDate = new Date(event.date);
  if(!(tempDate instanceof Date && !isNaN(tempDate.valueOf()))) {
    return 'Date format not valid';
  }

  if(!event.organizer.name) {
    return 'No organizer name found';
  }

  return true;
}

process();