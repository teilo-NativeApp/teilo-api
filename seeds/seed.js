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
  //--------------------------------------------

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
        income: faker.datatype.number({ min: 700, max: 2000 }),
        groups: [],
      };
      
      console.log(`Created fake user with email ${userData.email} and password ${userData.password}`);

      const user = new User(userData);
      return user.save();
    });

  // Resolve userPromises and assign to the usersCreated array
  try {
    usersCreated = await Promise.all(userPromises);
    console.log("------------------------------");
    console.log("All 15 fake users have been stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };
  //--------------------------------------------
  
  // Create OUR user objects
  let ourSavedUsers = [];
  const ourUserArray = [
    {
      username: "jon",
      email: "jon@teilo.com",
      password: "room7forlife",
      firstName: "Jonathan",
      lastName: "Shine",
      income: 1000,
      groups: [],
      color: "#FC8B0A"
    },
    {
      username: "tim",
      email: "tim@teilo.com",
      password: "room7forlife",
      firstName: "Tim",
      lastName: "Jungmann",
      income: 1500,
      groups: [],
      color: "#0263F5"
    },
    {
      username: "norm",
      email: "norm@teilo.com",
      password: "room7forlife",
      firstName: "Norman",
      lastName: "Metz",
      income: 2000,
      groups: [],
      color: "#49CE30"
    }
  ].map((newUser) => {
    console.log("*******************************");
    console.log(`Created user "${newUser.username}" with email ${newUser.email} and password ${newUser.password}`);
    console.log("*******************************");

    const user = new User(newUser);
    return user.save();
    });

    ourSavedUsers = await Promise.all(ourUserArray);
  //--------------------------------------------

  // Create 5 fake groups
  const userIDs = usersCreated.map(user => user._id);
  const groupPromises = Array(5)
    .fill(null)
    .map(() => {
      const usersToAdd = userIDs.splice(0, 3);

      // Function to fill expense field in the group model
      const expensesArr = () => {
        return Array(3)
        .fill(null)
        .map(() => {
          const userWhoPaid = faker.random.arrayElement(usersToAdd);
          let usersToAssign = faker.random.arrayElements(usersToAdd, faker.datatype.number({ min: 2, max: 3 }));
            
            return {
              expenseName: faker.random.words(),
              totalCost: faker.datatype.number({ min: 10, max: 250 }),
              date: faker.date.soon(7),
              whoPaid: userWhoPaid,
              assignedUsers: usersToAssign.includes(userWhoPaid) ? usersToAssign : [...usersToAssign, userWhoPaid]
            }
          })
      };
      const groupData = {
        groupName: faker.address.city(),
        incomeBased: faker.datatype.boolean(),
        address: faker.address.streetAddress(),
        users: usersToAdd,
        expenses: expensesArr()
      }
      console.log(`Created fake group ${groupData.groupName} with users ${groupData.users}`);
  
      const group = new Group(groupData);
      return group.save();
    });

  // Resolve groupPromises and assign to the groupsCreated array
  try {
    groupsCreated = await Promise.all(groupPromises);
    console.log("------------------------------");
    console.log("All 5 fake groups have been stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };

  // Assign the users with the correct groupID
  const usersWithGroupID = groupsCreated.map(group => {
    const user = User.updateMany(
      { _id: { $in: group.users } },
      { $push: { groups : group._id } },
      { multi: true, upsert: false }
    );
    return user;
  });

  try {
    await Promise.all(usersWithGroupID);
    console.log("------------------------------");
    console.log("All users have been updated with groupID and stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };
  //--------------------------------------------
  
  // Create OUR group
  const ourUserIDs = ourSavedUsers.map(user => user._id);
  console.log("*********************************", ourUserIDs);
  // const ourUserWhoPaid = faker.random.arrayElement(ourUserIDs);
  // let ourUsersToAssign = faker.random.arrayElements(ourUserIDs, faker.datatype.number({ min: 2, max: 3 }));
  // const expensesArr = () => {
  //   return Array(3)
  //   .fill(null)
  //   .map(() => {
        
  //       return {
  //         expenseName: faker.random.words(),
  //         totalCost: faker.datatype.number({ min: 10, max: 250 }),
  //         date: faker.date.soon(7),
  //         whoPaid: userWhoPaid,
  //         assignedUsers: usersToAssign.includes(userWhoPaid) ? usersToAssign : [...usersToAssign, userWhoPaid]
  //       }
  //     })
  // };
  const ourGroup = {
    groupName: "Room 7",
    incomeBased: true,
    address: "Vulkanstr. 1, Berlin",
    users: ourUserIDs,
    expenses: [
      {
        expenseName: "groceries",
        totalCost: 75,
        date: "2021-12-06T15:00:00.000Z",
        whoPaid: ourUserIDs[0],
        assignedUsers: [ourUserIDs[0], ourUserIDs[1], ourUserIDs[2]]
      },
      {
        expenseName: "cleaning supplies",
        totalCost: 19,
        date: "2021-12-05T15:00:00.000Z",
        whoPaid: ourUserIDs[2],
        assignedUsers: [ourUserIDs[0], ourUserIDs[1], ourUserIDs[2]]
      },
      {
        expenseName: "Indian take-away",
        totalCost: 24,
        date: "2021-12-04T15:00:00.000Z",
        whoPaid: ourUserIDs[1],
        assignedUsers: [ourUserIDs[1], ourUserIDs[0]]
      },
    ]
  };
    
  console.log(`Created our group ${ourGroup.groupName} with users ${ourGroup.users}`);

  let ourSavedGroup = new Group(ourGroup);
  ourSavedGroup = await ourSavedGroup.save();

  // Assign the users with the correct groupID
  const ourUsersUpdated = await User.updateMany(
      { _id: { $in: ourSavedGroup.users } },
      { $push: { groups : ourSavedGroup._id } },
      { multi: true, upsert: false }
  );
  //--------------------------------------------

  // Create 20 fake events
  const eventPromises = Array(20)
    .fill(null)
    .map(() => {
      const eventData = {
        title: faker.random.words(),
        description: faker.lorem.sentence(),
        date: faker.date.soon(3),
        groupID: faker.random.arrayElement(groupsCreated)._id
      };

      console.log(`Created fake event ${eventData.title} occurring on ${eventData.date}`);

      const event = new Event(eventData);
      return event.save();
    });

  // Resolve eventPromises and assign to the eventsCreated array
  try {
    eventsCreated = await Promise.all(eventPromises);
    console.log("------------------------------");
    console.log("All 20 fake events have been stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };

  // Add the events inside of the group according to groupID
  const popGroupWithEvents = eventsCreated.map(event => {
    const group = Group.findOneAndUpdate(
      { _id: event.groupID },
      { $push: { events: event._id } },
      { multi: true, upsert: false }
    );
    return group;
  });

  try {
    await Promise.all(popGroupWithEvents);
    console.log("------------------------------");
    console.log("All groups have been filled with events according to groupID and stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };
  //--------------------------------------------
  
  // Create OUR events
  let ourSavedEvents = [];
  const ourEvents = [
    {
      title: "Movie night",
      description: "comedy or drama?",
      date: "2021-12-08T20:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Night on the town!",
      description: "to drink, or not to drink?",
      date: "2021-12-09T22:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Roommate meeting",
      description: "chore assignment",
      date: "2021-12-10T15:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Weihnachtsmarkt",
      description: "Glühwein!",
      date: "2021-12-11T18:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Apartment yoga",
      description: "Namaste",
      date: "2021-12-09T15:00:00.000Z",
      groupID: ourSavedGroup._id
    },
  ].map((newEvent) => {
      console.log(`Created fake event ${newEvent.title} occurring on ${newEvent.date}`);

      const event = new Event(newEvent);
      return event.save();
    });

    ourSavedEvents = await Promise.all(ourEvents); 

  // Add the events inside of the group according to groupID
  // ourSavedEvents.map(event => {
  //   const 
  // const ourGroupUpdated = await Group.findByIdAndUpdate(
  //     ourSavedGroup._id,
  //     { $push: { events: { $each: ourSavedEvents } } },
  //     { new: true }
  //   );
  //--------------------------------------------

  // Create 20 fake tasks
  const taskPromises = Array(20)
    .fill(null)
    .map(() => {
      const taskData = {
        title: faker.random.words(),
        description: faker.lorem.sentence(),
        date: faker.date.soon(3),
        groupID: faker.random.arrayElement(groupsCreated)._id
      };

      console.log(`Created fake task ${taskData.title} occurring on ${taskData.date}`);

      const task = new Task(taskData);
      return task.save();
    });

  // Resolve taskPromises and assign to the tasksCreated array
  try {
    tasksCreated = await Promise.all(taskPromises);
    console.log("------------------------------");
    console.log("All 20 fake tasks have been stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };

  // Add the tasks inside of the group according to groupID
  const popGroupWithTasks = tasksCreated.map(task => {
    const group = Group.findOneAndUpdate(
      { _id: task.groupID },
      { $push: { tasks : task._id } },
      { multi: true, upsert: false }
    );
    return group;
  });
  
  try {
    await Promise.all(popGroupWithTasks);
    console.log("------------------------------");
    console.log("All groups have been populated with tasks and stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };

  // Seeding users from the corresponding groups to assignedUsers field inside of task
  const popTaskWithUser = tasksCreated.map(task => {
    const filterGroupID = groupsCreated.filter(group => group._id ==  task.groupID);
    return Task.findByIdAndUpdate(
      task._id,
      { $push: { assignedUsers: faker.random.arrayElements(filterGroupID[0].users, faker.datatype.number({ min: 1, max: 3 })) }}
    )
  });

  try {
    await Promise.all(popTaskWithUser);
    console.log("------------------------------");
    console.log("All tasks have been populated with users and stored to the database");
    console.log("------------------------------");
  } catch (error) {
    console.log(error.message);
  };
  //--------------------------------------------

  // Create OUR Tasks
  let ourSavedTasks = [];
  const ourTasks = [
    {
      title: "DCI Final Presentation",
      description: "DCI Final Presentation",
      date: "2021-12-08T15:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Clean kitchen",
      description: "Clean kitchen",
      date: "2021-12-08T16:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Sort basement",
      description: "Sort basement",
      date: "2021-12-09T17:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Grocery shopping",
      description: "Grocery shopping",
      date: "2021-12-10T18:00:00.000Z",
      groupID: ourSavedGroup._id
    },
    {
      title: "Paint living room",
      description: "Paint living room",
      date: "2021-12-11T19:00:00.000Z",
      groupID: ourSavedGroup._id
    },
  ].map((newTask) => {
    console.log(`Created fake tasks ${newTask.title} occurring on ${newTask.date}`);

      const task = new Task(newTask);
      return task.save();
  });

  ourSavedTasks = await Promise.all(ourTasks);

  const ourGroupUpdated = await Group.findByIdAndUpdate(
    ourSavedGroup._id,
    { $push: { events: { $each: ourSavedEvents },
      tasks: { $each: ourSavedTasks } } },
    { new: true }
  );

  console.log(ourGroupUpdated);

  // Close the connection to the database
  mongoose.connection.close();

})();
// --------------------------------------------------