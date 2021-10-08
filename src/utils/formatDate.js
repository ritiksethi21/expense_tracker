const formatDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  let month = `${newDate.getMonth() + 1}`;
  const day = `${newDate.getDate()}`;

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};
export default formatDate;
