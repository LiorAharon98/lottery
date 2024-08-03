import dayjs from "dayjs";

const currentDay = new Date().getDay();

let tempNum = Number();
switch (currentDay) {
  case 0:
    tempNum = 3;
    break;
  case 1:
    tempNum = 2;
    break;
  case 2:
    tempNum = 1;
    break;
  case 3:
    tempNum = 4;
    break;
  case 4:
    tempNum = 3;
    break;
  case 5:
    tempNum = 2;
    break;
  case 6:
    tempNum = 1;
    break;
}

const specificDay = dayjs()
  .set("day", currentDay + tempNum)
  .set("hour", 0)
  .set("minute", 0)
  .set("second", 0)
  .valueOf();

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const finalDataDate = () => {
  const currentDate = dayjs().valueOf();

  const gap = specificDay - currentDate;
  const dayTimestamp = Math.floor(gap / day);
  const hourTimestamp = Math.floor((gap % day) / hour) - 2;
  const minuteTimestamp = Math.floor((gap % hour) / minute);

  return [
    { label: "days", time: dayTimestamp },
    { label: "hours", time: hourTimestamp },
    { label: "minuets", time: minuteTimestamp },
  ];
};
export { finalDataDate, minute };
