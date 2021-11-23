let expenses = [
  {
    expenseName: "groceries",
    totalCost: 30,
    whoPaid: 1,
    assignedUsers:[1,2,4,5]
  },
  {
    expenseName: "gas",
    totalCost: 15,
    whoPaid: 2,
    assignedUsers:[1,3,5]
  },
  {
    expenseName: "movie night",
    totalCost: 60,
    whoPaid: 2,
    assignedUsers:[2,5]
  },
  {
    expenseName: "fridge",
    totalCost: 120,
    whoPaid: 3,
    assignedUsers:[3,4,5]
  },
  {
    expenseName: "television",
    totalCost: 300,
    whoPaid: 2,
    assignedUsers:[1,2,3,4,5]
  },
];

// let expenses =[
//   {
//     expenseName: "groceries",
//     totalCost: 50,
//     whoPaid: 1,
//     assignedUsers:[1,2,3,4,5]
//   },
//   {
//     expenseName: "whatever",
//     totalCost: 50,
//     whoPaid: 2,
//     assignedUsers:[1,2,3,4,5]
//   }
// ];

let users = [
  { _id: 1, name: "Tim", income: 500 },
  { _id: 2, name: "Jon", income: 500  },
  { _id: 3, name: "Norm", income: 500  },
  { _id: 4, name: "Rob", income: 1000 },
  { _id: 5, name: "Vasilis", income: 750 }
];

const expenseCalculation = () => {
  // create the data structure for each user
  const prepareDataStructure = users.map(user=>{

    let groupIncome = users.reduce((state, item) => {
      return state += item.income;
    }, 0);

    let calculateProportion = (income) => {
      return income / groupIncome
    }

    let flatmates = users.filter(flatmate=>{
      return user._id !== flatmate._id
    })

    flatmates = flatmates.map(mate=>{
      return { ...mate, amount:0}
    })

    const object = {
      ...user,
      proportion: calculateProportion(user.income),
      overallAmount:0,
      individualBalances: flatmates
    }

    return object;
  })

  // 1. first we iterate over the array of user objects
  // 2. inside, we iterate of the expenses array to take the amounts and assign them in the appropriate fields
  // 3. find the average of the expense based on who is sharing the cost
  // 4. 'find' the user who paid
  // 5. update 'user who paid's' overallAmount
  // 6. iterate over the users who are involved in the expense
  // 7. iterate over the individualBalances array inside the 'user who paid'
  // 8. 'find' the users from assignedUser in individualBalances
  // 9. update their amount with the average cost
  // 10. we are still 'in' assigned users, now we iterate over the array of user objects
  // 11. 'match' the users involved in the expense with their _id
  // 12. update their overallAmount with the splitAmount which they owe to the 'user who paid'
  // 13. iterate over the assignedUser's individualBalance array
  // 14. 'find' the object of the 'user who paid'
  // 15. update their amount with the splitAmount
  
  // 1.
  const calculateBalances = prepareDataStructure.map(user=>{
    // 2.
    expenses.forEach(expense=>{
      // 3.
      const splitAmount = expense.totalCost / expense.assignedUsers.length;

      // 4.
      if(user._id === expense.whoPaid){
        // 5.
        user.overallAmount += expense.totalCost;
        
        // 6. 
        expense.assignedUsers.forEach(assignedUser=>{
          // 7.
          user.individualBalances.forEach(individualBalance=>{
            // 8.
            if(assignedUser === individualBalance._id){
              // 9.
              individualBalance.amount += splitAmount;
            }
          })
          // 10.
          prepareDataStructure.forEach(user2=>{
            // 11.
            if(assignedUser === user2._id){
              // 12.
              user2.overallAmount -= splitAmount;
              // 13.
              user2.individualBalances.forEach(individualBalance2=>{
                // 14. 
                if(individualBalance2._id === user._id){
                  // 15.
                  individualBalance2.amount -= splitAmount;
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

const result = expenseCalculation();

result.forEach(i=>{
  console.log(i);
});


/*

[
  { 
    _id: 1,
    name: "Tim",
    overallAmount:0,
    individualBalances:[
      { _id: 2, name: "Jon", amount:0 }
      { _id: 3, name: "Norm", amount:0 }
      { _id: 4, name: "Rob", amount:0 }
      { _id: 5, name: "Vasilis", amount:0 }
    ] 
  }
]

*/
