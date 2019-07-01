"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function secondToDay(params) {
    var s = params;
    var m, h, day;
    m = s / 60;
    h = m / 60;
    day = h / 24;
    return ~~day + " day, " + ~~h + " h, " + ~~m + " m";
}
exports.secondToDay = secondToDay;
function byteToMb(params) {
    return params / 1073741824 + " GB";
}
exports.byteToMb = byteToMb;
// export = {
//   secondToDay,
//   byteToMb
// };
