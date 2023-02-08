import moment from "moment";

function formatDate(timestamp) {
  var times=  new Date(timestamp*1000)
  // console.log('times: ',times);
  var time = moment(times).format("DD/MM/YYYY h:mm:ss");
  return time
}
export function monthYearFormat(timestamp) {
  var times=  new Date(timestamp*1000)
  // console.log('times: ',times);
  var time = moment(times).format("MMMM, YYYY");
  return time
}

export default formatDate;
