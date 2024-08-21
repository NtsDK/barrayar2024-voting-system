const dateList = ["22 августа", "23 августа", "24 августа", "25 августа"];

const hourList = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];

export const DATE_TIME_LIST: { date: string; time: string[] }[] = [];

for (const date of dateList) {
  const el: { date: string; time: string[] } = { date, time: [] };
  for (const hour of hourList) {
    el.time.push(`${hour}:00`);
  }
  DATE_TIME_LIST.push(el);
}
