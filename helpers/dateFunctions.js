export const threeDayRange = ( date ) => {

  // if date given => convert to date object
  if (date) {
    date = new Date(date);
  } else {
    // if no date given => take today
    date = new Date();
  }

  const rightNow = new Date();

  // gets the current time in UTC format
  const dateStart = new Date(rightNow.setHours(0, 0, 0, 0)).toISOString();

  const dateEnd = new Date();
  // sets end date to three days from current time in UTC
  dateEnd.setDate(new Date().getDate() + 3);
  dateEnd.setHours(23, 59, 59, 999);
  // need to change this to include everything from 0 to 23:59?
  // what happens if we are at the end of the month???

  const dayFilter = { date: { $gte: dateStart, $lte: dateEnd.toISOString() } };
  return dayFilter
};