// IMPORTS ------------------------------------------
import createError from 'http-errors';
import Group from '../models/Group.js';
import { threeDayRange } from '../helpers/dateFunctions.js';
import User from '../models/User.js';
// --------------------------------------------------


// METHODS ------------------------------------------
export const createGroup = async (req, res, next) => {
  const data = req.body;
  console.log("Creating a group with --> ", data);
  try {
    const group = new Group(data);
    const savedGroup = await group.save();
    res.json(savedGroup);
  } catch (error) {
    next(error);
  };
};

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    next(error);
  };
};

export const getOneGroup = async (req, res, next) => {
  const { id } = req.params;
  const threeDaysFromNow = threeDayRange();
  
  try {
    const group = await Group.findById(id)
    .populate(
      [{ 
        path: 'events',
        match: threeDayRange(),
        select: '-createdAt -updatedAt'
      },
      { 
        path: 'tasks',
        match: threeDayRange(),
        select: '-createdAt -updatedAt'
      },
      {
        path: 'users'
      },
      {
        path: "expenses",
        populate: {
          path: "assignedUsers",
          select: "firstName income"
        }
      }
    ]);
    if (!group) throw new createError(404, `No group with id --> ${id}found`);
    res.json(group);
  } catch (error) {
    next(error);
  };
};

export const updateGroup = async (req, res, next) => {
  // need to add hashing in case of password change
  const threeDaysFromNow = threeDayRange();

  let group;
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.body.expenses) {
      group = await Group.findByIdAndUpdate(id, {$push: {expenses: updateData.expenses}}, {new: true}).populate(
        [{ 
          path: 'events',
          match: threeDayRange(),
          select: '-createdAt -updatedAt'
        },
        { 
          path: 'tasks',
          match: threeDayRange(),
          select: '-createdAt -updatedAt'
        },
        {
          path: 'users'
        },
        {
          path: "expenses",
          populate: {
            path: "assignedUsers",
            select: "firstName income"
          }
        }
      ])
    } else if (req.body._id) {
      group = await Group.findByIdAndUpdate(id, {$push: {users: updateData._id}}, {new: true}).populate(
        [{ 
          path: 'events',
          match: threeDayRange(),
          select: '-createdAt -updatedAt'
        },
        { 
          path: 'tasks',
          match: threeDayRange(),
          select: '-createdAt -updatedAt'
        },
        {
          path: 'users'
        },
        {
          path: "expenses",
          populate: {
            path: "assignedUsers",
            select: "firstName income"
          }
        }
      ])
    } else {
    group = await Group.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate(
      [{ 
        path: 'events',
        match: threeDayRange(),
        select: '-createdAt -updatedAt'
      },
      { 
        path: 'tasks',
        match: threeDayRange(),
        select: '-createdAt -updatedAt'
      },
      {
        path: 'users'
      },
      {
        path: "expenses",
        populate: {
          path: "assignedUsers",
          select: "firstName income"
        }
      }
    ])};

    if (!group) throw new createError(404, `No group with id --> ${id} found`);
    res.send(group);
  } catch (error) {
    next(error);
  };
};

export const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Group.findByIdAndDelete(id);
    if (!group) throw new createError(404, `No group with id --> ${id} was found`);
    res.json({
      success: `Group with id:${id} was deleted.`,
      group: group
    });
  } catch (error) {
    next( error );
  };
};

export const addExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { totalCost } = req.body.expenses;
    
    const group = await Group.findByIdAndUpdate(id, {$inc: {totalSpent: totalCost}, $push: {expenses: updateData.expenses}}, {new: true});
    
    const amountSplit = totalCost / group.users.length;
    const amountToPayer = amountSplit * (group.users.length - 1);
    const negativeAmountSplit = (amountSplit * (-1));

    const usersWhoDidNotPay = group.users.filter(user => {
      return user._id != updateData.expenses.whoPaid
    });

    const userWhoPaid = await User.findByIdAndUpdate(updateData.expenses.whoPaid, {$inc: {balanceOverall: amountToPayer}});

    const usersNotPaid = await User.updateMany({_id: {$in: usersWhoDidNotPay}}, {$inc: {balanceOverall: negativeAmountSplit}});

    res.send(group);
  } catch (error) {
    next(error);
  }
};

// export const updateBalanceToUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
//     const { totalCost } = req.body.expenses;
    
//     const group = await Group.findById(id);
    
//     const amountSplit = totalCost / group.users.length;
//     const amountToPayer = amountSplit * (group.users.length - 1);
//     const negativeAmountSplit = (amountSplit * (-1));

//     const usersWhoDidNotPay = group.users.filter(user => {
//       return user._id != updateData.expenses.whoPaid
//     });

//     const userWhoPaid = await User.findByIdAndUpdate(updateData.expenses.whoPaid, {balanceToUser: {user: , amount: }});

//     const usersNotPaid = await User.updateMany({_id: {$in: usersWhoDidNotPay}}, {$inc: {balanceOverall: negativeAmountSplit}});

//   } catch (error) {
    
//   }
// }
// --------------------------------------------------