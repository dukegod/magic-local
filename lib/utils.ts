
export function secondToDay(params: number): String {
  let s: number = params;
  let m: number, h: number, day: number;
  m = s / 60;
  h = m / 60;
  day = h / 24;
  return `${~~day} day, ${~~h} h, ${~~m} m`;
}

export function byteToMb(params: any): String {
  return `${params / 1073741824} GB`;
}

// export = {
//   secondToDay,
//   byteToMb
// };
