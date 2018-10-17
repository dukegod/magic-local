function secondToDay(params) {
  let s = params;
  let m, h, day
  m = s/60;
  h = m/60;
  day = h/24;
  return `${~~day} day, ${~~h} h, ${~~m} m`
}

function byteToMb(params) {
  let bt = params
  return `${bt/1073741824} GB`
}

module.exports = {
  secondToDay,
  byteToMb
}
