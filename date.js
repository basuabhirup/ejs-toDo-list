module.exports.getTodayFull = getTodayFull;
module.exports.getToday = getToday;
module.exports.getDate = getDate;



function getTodayFull() {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  let today = new Date().toLocaleDateString('en-US', options);
  return today;
}

function getToday() {
  const options = {
    weekday: 'long',
  }
  let today = new Date().toLocaleDateString('en-US', options);
  return today;
}

function getDate() {
  const options = {
    day: 'numeric',
    month: 'long',
  }
  let today = new Date().toLocaleDateString('en-US', options);
  return today;
}
