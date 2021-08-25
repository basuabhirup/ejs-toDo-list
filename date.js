exports.getTodayFull = function () {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  return new Date().toLocaleDateString('en-US', options);
}

exports.getToday = function () {
  const options = {
    weekday: 'long',
  }
  return new Date().toLocaleDateString('en-US', options);
}

exports.getDate = function () {
  const options = {
    day: 'numeric',
    month: 'long',
  }
  return new Date().toLocaleDateString('en-US', options);
}
