import moment from 'moment';

export const getDiffTowDates = (from, to) => {
  const fromDate = moment(from, 'MM-DD-YYYY');
  const toDate = moment(to, 'MM-DD-YYYY   ');

  const date = toDate.diff(fromDate, 'days') + 1;

  return date;
};
