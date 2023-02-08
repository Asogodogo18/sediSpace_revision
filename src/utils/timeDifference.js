const timeDifference = (previous) => {
  var today = new Date();
  var current = Date.parse(today);

  // console.log("current: ", current);

  // console.log("prev : ", previous);
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous *1000;



  // console.log('elapsed: ',elapsed);

  if (elapsed < msPerMinute) {
    return "il y'a "+ Math.round(elapsed / 1000) + " secondes";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return "il y'a "+ Math.round(elapsed / msPerHour) + " heures";
  } else if (elapsed < msPerMonth) {
    return "il y'a "+ Math.round(elapsed / msPerDay) + " jours";
  } else if (elapsed < msPerYear) {
    return "il y'a " +Math.round(elapsed / msPerMonth) + " mois";
  } else {
    return "il y'a approximativement " + Math.round(elapsed / msPerYear) + " ans";
  }
};
export default timeDifference;
