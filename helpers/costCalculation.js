// TO BE USED IN THE FRONTEND UI

let expenses = [
  {
    "_id": "61a4c50137f2c01306cc4b4f",
    "assignedUsers": [
      {
        "_id": "61a4c4ff37f2c01306cc4b31",
        "firstName": "Kailey",
        "income": 1511,
      },
      {
        "_id": "61a4c4ff37f2c01306cc4b2f",
        "firstName": "Major",
        "income": 1465,
      },
      {
        "_id": "61a4c4ff37f2c01306cc4b30",
        "firstName": "Janis",
        "income": 1074,
      },
    ],
    "date": "2021-12-05T13:57:04.284Z",
    "expenseName": "paradigms alarm Engineer",
    "settled": false,
    "totalCost": 223,
    "whoPaid": "61a4c4ff37f2c01306cc4b30",
  },
  {
    "_id": "61a4c50137f2c01306cc4b50",
    "assignedUsers": [
      {
        "_id": "61a4c4ff37f2c01306cc4b31",
        "firstName": "Kailey",
        "income": 1511,
      },
      {
        "_id": "61a4c4ff37f2c01306cc4b30",
        "firstName": "Janis",
        "income": 1074,
      },
      {
        "_id": "61a4c4ff37f2c01306cc4b2f",
        "firstName": "Major",
        "income": 1465,
      },
    ],
    "date": "2021-12-05T15:10:13.983Z",
    "expenseName": "Plastic Ergonomic systems",
    "settled": false,
    "totalCost": 87,
    "whoPaid": "61a4c4ff37f2c01306cc4b2f",
  },
  {
    "_id": "61a4c50137f2c01306cc4b51",
    "assignedUsers": [
      {
        "_id": "61a4c4ff37f2c01306cc4b2f",
        "firstName": "Major",
        "income": 1465,
      },
      {
        "_id": "61a4c4ff37f2c01306cc4b30",
        "firstName": "Janis",
        "income": 1074,
      },
      {
        "_id": "61a4c4ff37f2c01306cc4b31",
        "firstName": "Kailey",
        "income": 1511,
      },
    ],
    "date": "2021-12-02T19:22:09.722Z",
    "expenseName": "Producer",
    "settled": false,
    "totalCost": 178,
    "whoPaid": "61a4c4ff37f2c01306cc4b31",
  },
];

let users = [
  {
    "_id": "61a4c4ff37f2c01306cc4b2f",
    "createdAt": "2021-11-29T12:18:08.013Z",
    "email": "Keven_McClure@yahoo.com",
    "firstName": "Major",
    "groups": [
      "61a4c50137f2c01306cc4b4e",
    ],
    "income": 1465,
    "lastName": "Abernathy",
    "password": "$2a$10$PtRPSO5F0oHHLlksLy1ObuGviO6TEkSfbZ0JOQ0jLi.GkEjLOZteC",
    "updatedAt": "2021-11-29T12:18:09.853Z",
    "username": "Juana69",
  },
  {
    "_id": "61a4c4ff37f2c01306cc4b30",
    "createdAt": "2021-11-29T12:18:08.013Z",
    "email": "Rubie.Bins71@yahoo.com",
    "firstName": "Janis",
    "groups": [
      "61a4c50137f2c01306cc4b4e",
    ],
    "income": 1074,
    "lastName": "Tremblay",
    "password": "$2a$10$.6ADGtvHZIovJbOgHtbeiOlmfi8l5mEzzE6xcNsE6yfoopIvsY/RS",
    "updatedAt": "2021-11-29T12:18:09.853Z",
    "username": "Ofelia_Crist",
  },
  {
    "_id": "61a4c4ff37f2c01306cc4b31",
    "createdAt": "2021-11-29T12:18:08.013Z",
    "email": "Dimitri.Schmeler61@hotmail.com",
    "firstName": "Kailey",
    "groups": [
      "61a4c50137f2c01306cc4b4e",
    ],
    "income": 1511,
    "lastName": "Cormier",
    "password": "$2a$10$5ltYpkrtC2yYQvQ5Xc0Jj.ef0VEKe.zt707WsmlQ98qGJP.TI3YTu",
    "updatedAt": "2021-11-29T12:18:09.853Z",
    "username": "Jerod62",
  },
];


// let expenses = [
//   {
//     expenseName: "groceries",
//     totalCost: 30,
//     whoPaid: 1,
//     assignedUsers:[
//       { _id: 1, name: "Tim", income: 500 },
//       { _id: 2, name: "Jon", income: 500 },
//       { _id: 4, name: "Rob", income: 1000},
//       { _id: 5, name: "Vasilis", income: 750 }
//     ]
//   },
//   {
//     expenseName: "gas",
//     totalCost: 15,
//     whoPaid: 2,
//     assignedUsers:[
//       { _id: 1, name: "Tim", income: 500 },
//       { _id: 3, name: "Norm", income: 500 },
//       { _id: 5, name: "Vasilis", income: 750 }
//     ]
//   },
//   {
//     expenseName: "movie night",
//     totalCost: 60,
//     whoPaid: 2,
//     assignedUsers:[
//       { _id: 2, name: "Jon", income: 500 },
//       { _id: 5, name: "Vasilis", income: 750 }
//     ]
//   },
//   {
//     expenseName: "fridge",
//     totalCost: 120,
//     whoPaid: 3,
//     assignedUsers:[
//       { _id: 3, name: "Norm", income: 500 },
//       { _id: 4, name: "Rob", income: 1000},
//       { _id: 5, name: "Vasilis", income: 750 }
//     ]
//   },
//   {
//     expenseName: "television",
//     totalCost: 300,
//     whoPaid: 2,
//     assignedUsers:[
//       { _id: 1, name: "Tim", income: 500 },
//       { _id: 2, name: "Jon", income: 500 },
//       { _id: 3, name: "Norm", income: 500 },
//       { _id: 4, name: "Rob", income: 1000},
//       { _id: 5, name: "Vasilis", income: 750 }
//     ]
//   },
// ];

// let expenses =[
//   {
//     expenseName: "groceries",
//     totalCost: 50,
//     whoPaid: 5,
//     assignedUsers:[
//             { _id: 1, name: "Tim", income: 1000 },
//             { _id: 5, name: "Vasilis", income: 4000 }
//           ]
//   },
//   {
//     expenseName: "whatever",
//     totalCost: 50,
//     whoPaid: 2,
//     assignedUsers:[
//             { _id: 1, name: "Tim", income: 1000 },
//             { _id: 2, name: "Jon", income: 1000 },
//             { _id: 3, name: "Norm", income: 1000 },
//             { _id: 4, name: "Rob", income: 1000},
//             { _id: 5, name: "Vasilis", income: 4000 }
//           ]
//   }
// ];

// let users = [
//   { _id: 1, name: "Tim", income: 500 },
//   { _id: 2, name: "Jon", income: 500 },
//   { _id: 3, name: "Norm", income: 500 },
//   { _id: 4, name: "Rob", income: 1000 },
//   { _id: 5, name: "Vasilis", income: 750 }
// ];


const expenseCalculationByIncome = () => {
  // create the data structure for each user
  const roundToTwoDecimals = (number) => {
    return +number.toFixed(2);
  }

  const prepareDataStructure = users.map(user=>{

    let flatmates = users.filter(flatmate=>{
      return user._id !== flatmate._id
    })

    flatmates = flatmates.map(mate=>{
      return { ...mate, amount:0}
    })

    const object = {
      ...user,
      overallAmount:0,
      individualBalances: flatmates
    }

    return object;
  })

  // 1.
  const calculateBalances = prepareDataStructure.map(user=>{
    // 2.
    expenses.forEach(expense=>{

      let assigneesIncome = expense.assignedUsers.reduce((state, item) => {
        return state += item.income;
      }, 0);
      
      // 4.
      if(user._id === expense.whoPaid){
        // 3.
        const amountOwed = expense.totalCost * (1-(user.income / assigneesIncome));
        // 5.
        user.overallAmount = roundToTwoDecimals(user.overallAmount + amountOwed);
        
        // 6. 
        expense.assignedUsers.forEach(assignedUser=>{
          const assigneeSplit = expense.totalCost * (assignedUser.income / assigneesIncome);
          // 7.
          user.individualBalances.forEach(individualBalance=>{
            // 8.
            if(assignedUser._id === individualBalance._id){
              // 9.
              individualBalance.amount = roundToTwoDecimals(individualBalance.amount + assigneeSplit);
            }
          })
          // 10.
          prepareDataStructure.forEach(user2=>{

            // 11.
            if(assignedUser._id === user2._id && user._id !== user2._id){
              // 12.
              user2.overallAmount = roundToTwoDecimals(user2.overallAmount - assigneeSplit);
              
              // 13.
              user2.individualBalances.forEach(individualBalance2=>{
                // 14. 
                if(individualBalance2._id === user._id){
                  // 15.
                  individualBalance2.amount = roundToTwoDecimals(individualBalance2.amount - assigneeSplit);
                }
              })
            }
          })
        })
      }
    })
    return user;
  })
  return calculateBalances;
};

 // * ******************************************** * //


 // 1. first we iterate over the of user 
  // 2. inside, we iterate of the expenses to take the amounts and assign them in the appropriate fields
  // 3. find the average of the expense based on who is sharing the cost
  // 4. 'find' the user who paid
  // 5. update 'user who paid's' overallAmount
  // 6. iterate over the users who are involved in the expense
  // 7. iterate over the individualBalances inside the 'user who paid'
  // 8. 'find' the users from assignedUser in individualBalances
  // 9. update their amount with the average cost
  // 10. we are still 'in' assigned users, now we iterate over the of user 
  // 11. 'match' the users involved in the expense with their _id
  // 12. update their overallAmount with the splitAmount which they owe to the 'user who paid'
  // 13. iterate over the assignedUser's individualBalance
  // 14. 'find' the of the 'user who paid'
  // 15. update their amount with the splitAmount


const expenseCalculationEvenly = () => {
  // create the data structure for each user
  const roundToTwoDecimals = (number) => {
    return +number.toFixed(2);
  }

  const prepareDataStructure = users.map(user=>{

    let flatmates = users.filter(flatmate=>{
      return user._id !== flatmate._id
    })

    flatmates = flatmates.map(mate=>{
      return { ...mate, amount:0}
    })

    const object = {
      ...user,
      overallAmount:0,
      individualBalances: flatmates
    }

    return object;
  })

  // 1.
  const calculateBalances = prepareDataStructure.map(user=>{
    // 2.
    expenses.forEach(expense=>{
      // 3.
      const splitAmount = expense.totalCost / expense.assignedUsers.length;

      // 4.
      if(user._id === expense.whoPaid){
        // 5.
        user.overallAmount = roundToTwoDecimals(user.overallAmount + expense.totalCost);
        
        // 6. 
        expense.assignedUsers.forEach(assignedUser=>{
          // 7.
          user.individualBalances.forEach(individualBalance=>{
            // 8.
            if(assignedUser._id === individualBalance._id){
              // 9.
              individualBalance.amount = roundToTwoDecimals(individualBalance.amount + splitAmount);
            }
          })
          // 10.
          prepareDataStructure.forEach(user2=>{
            // 11.
            if(assignedUser._id === user2._id){
              // 12.
              user2.overallAmount = roundToTwoDecimals(user2.overallAmount - splitAmount);
              // 13.
              user2.individualBalances.forEach(individualBalance2=>{
                // 14. 
                if(individualBalance2._id === user._id){
                  // 15.
                  individualBalance2.amount = roundToTwoDecimals(individualBalance2.amount - splitAmount);
                }
              })
            }
          })
        })
      }
    })
    return user;
  })
  return calculateBalances;
};


// const result = expenseCalculationByIncome();
const result = expenseCalculationEvenly();

result.forEach(i=>{
  console.log(i);
});

