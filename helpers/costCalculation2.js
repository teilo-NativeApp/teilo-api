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
// ]

let users = [
  { _id: 1, name: "Tim" },
  { _id: 2, name: "Jon" },
  { _id: 3, name: "Norm" },
  { _id: 4, name: "Rob"},
  { _id: 5, name: "Vasilis"}
];

const prepareDataStructure = () => {
  const balancesArray = users.map(user=>{

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

  // loop over expenses
  // -> who paid?
  // -> updata overallBalance
  // -> who is splitting?
  // -> split based on number of people
  // -> update amount inside the paying user's individualBalances objects

  // const dividedExpenses = expenses.map(expense=>{
  //   const payingUser = balancesArray.filter(user=>{
  //     return expense.whoPaid === user._id;
  //   })
  //   return payingUser;
  // })
  // return dividedExpenses;

  const dividedExpenses = balancesArray.map(user=>{
    expenses.forEach(expense=>{
      const splitAmount = expense.totalCost / expense.assignedUsers.length;
      if(user._id === expense.whoPaid){
        const userWhoPaid = expense.whoPaid;
        const userWereOn = user._id;
        user.overallAmount += expense.totalCost;
        // step 1
        expense.assignedUsers.map(assignedUser=>{
          user.individualBalances.map(individualBalance=>{
            if(assignedUser === individualBalance._id){
              individualBalance.amount += splitAmount;
            }
          })
          balancesArray.map(userr=>{
            if(assignedUser === userr._id){
              userr.overallAmount -= splitAmount;
              userr.individualBalances.map(individualBalancee=>{
                if(individualBalancee._id === user._id){
                  individualBalancee.amount -= splitAmount;
                }
              })
            }
          })
        })
        // step 2
        // user.individualBalances.map(indBalance=>{
        //   if(indBalance._id === expense.whoPaid){
        //     indBalance.amount -= splitAmount;
        //   }
        // })
      } else {
        // user.overallBalance -= splitAmount;
      }
    })
    return user;
  })
  return dividedExpenses;
};

const dataStructure = prepareDataStructure();

dataStructure.forEach(i=>{
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
