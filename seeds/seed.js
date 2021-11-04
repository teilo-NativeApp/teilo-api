// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
import '../db-connect.js';

import User from '../models/User.js';
import Group from '../models/Group.js';
import Event from '../models/Event.js';
import Task from '../models/Task.js';

import faker from 'faker';
// --------------------------------------------------


// SEEDING ------------------------------------------
let usersCreated = [];
let groupsCreated = [];
let eventsCreated = [];
let tasksCreated = [];

(async function () {
  
  // First delete all previous data
  try {
    await Group.deleteMany({});
    console.log("All GROUPS have been deleted");
  } catch (error) {
    console.log(error.message);
  };

  try {
    await User.deleteMany({});
    console.log("All USERS have been deleted");
  } catch (error) {
    console.log(error.message);
  };

  try {
    await Event.deleteMany({});
    console.log("All EVENTS have been deleted");
  } catch (error) {
    console.log(error.message);
  };

  try {
    await Task.deleteMany({});
    console.log("All TASKS have been deleted");
  } catch (error) {
    console.log(error.message);
  };

  // Create 15 fake users
  const userPromises = Array(15)
    .fill(null)
    .map(() => {
      const userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: "room7forlife",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        income: faker.datatype.number({ "min": 700, "max": 2000 }),
        groups: [],
      };
      
      console.log(`Created fake user with email ${userData.email} and password ${userData.password}`);

      const user = new User(userData);
      return user.save();
    });

  try {
    usersCreated = await Promise.all(userPromises);
    console.log("------------------------------");
    console.log("All 15 fake users have been stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };

  // Create 20 fake events
  const eventPromises = Array(20)
    .fill(null)
    .map(() => {
      const eventData = {
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        date: faker.date.soon(7)
      };

      console.log(`Created fake event with ${eventData.title} occurring on ${eventData.date}`);

      const event = new Event(eventData);
      return event.save();
    });

    try {
      eventsCreated = await Promise.all(eventPromises);
      console.log("------------------------------");
      console.log("All 20 fake events have been stored to the database");
      console.log("------------------------------");
    } catch (error) {
      console.log(error.message);
    };

  // Create 5 fake groups
  // const groupPromises = Array(5)
  //   .fill(null)
  //   .map(() => {
  //     const groupData = {
  //       groupName: faker.unique.country(),
  //       address: faker.address(),
  //       users: faker.random.arrayElement(userIDs)
  //     }
  //   })

  mongoose.connection.close();
})();
// --------------------------------------------------
