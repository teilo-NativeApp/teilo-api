let expenses = [
  {
    expenseName: "groceries",
    totalCost: 30,
    whoPaid: 1
  },
  {
    expenseName: "gas",
    totalCost: 15,
    whoPaid: 2
  },
  {
    expenseName: "movie night",
    totalCost: 60,
    whoPaid: 2
  },
  {
    expenseName: "fridge",
    totalCost: 120,
    whoPaid: 3
  },
  {
    expenseName: "television",
    totalCost: 300,
    whoPaid: 2
  },
];

let users = [
  { _id: 1, name: "Tim" },
  { _id: 2, name: "Jon" },
  { _id: 3, name: "Norm" },
  { _id: 4, name: "Rob"},
  { _id: 5, name: "Vasilis"}
];

const try2 = (expenses) => {
  const sumOfTotals = expenses.reduce((state, item) => {
    state.total += item.totalCost;
    
    state[item.whoPaid] += item.totalCost;

    return state;
  }, {total: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
  
  let averageSplit = sumOfTotals.total / users.length;
  
  for (let item in sumOfTotals) {
    console.log( averageSplit - sumOfTotals[item]);
  }

  console.log(sumOfTotals);
};

try2(expenses);
console.log("----------------------------");




let authData = {
  _id: 1
};



const calculation = (expenses) => {
  
  const splitExpenses = expenses.map(expense => {
    let amountSplit = expense.totalCost / users.length;
    let amountToPayer = amountSplit * (users.length - 1);
    let negativeSplitAmount = amountSplit * (-1);

    const usersWhoDidNotPay = users.filter(user => {
      return user._id != expense.whoPaid
    });

    const assignedAmountToNonpayers = usersWhoDidNotPay.map(user => {
      let result = {
        _id: user._id,
        amount: negativeSplitAmount
      };
      console.log(result);
      return result;
    });

    return {
      _id: expense.whoPaid,
      overallBalance: amountToPayer,
      balances: assignedAmountToNonpayers
    }
  })

  return splitExpenses;
  
  // const balances = expenses.reduce((state, item) => {
  //   if (state[item.whoPaid]) {
  //     state[item.whoPaid]
  //   } else {
  //     state.push({_id: item.whoPaid, amountPaid: item.totalCost})
  //   }
  // }, [])
};

console.log(calculation(expenses));

/*
desiredOutput = [
  { 
    user: Tim,
    balances: [
      {
        name: Jon,
        amount: -20
      },
      {
        name: Norm,
        amount: 35
      }
    ]
  }
]

user: Tim,
balances: [
  {
    name: Jon,
    transactions: [
      {
        amount: splitAmount
      }
    ]
  }
]


*/