const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRoute");
const LotteryRoute = require("./routes/LotteryRoute");
const createLottery = require("./createLottery");
const app = express();
const serverConfig = require("./config");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
serverConfig(app, express);
app.use("/lottery", UserRoute);
app.use("/lottery", LotteryRoute);

createLottery();

app.listen(process.env.PORT);

// const romanChars = [
//   { char: "I", num: 1 },
//   { char: "V", num: 5 },
//   { char: "X", num: 10 },
//   { char: "E", num: 100 },
//   { char: "D", num: 1000 },
// ];

// const test = (str) => {
//   let temp = [];
//   let isFound = false;
//   let currentChar = 0;
//   for (let i = 0; i < str.length; i++) {
//     for (let j = 0; j < romanChars.length; j++) {
//       if (str[i] === romanChars[j].char) {
//         temp.push({char : romanChars[j].char , num : romanChars[j].num})
//         // currentChar += romanChars[j].num;
//       }
//     }
//   }
// console.log(temp)
// };
// test("XXD");

const arr = [1,2,5,1,2,2,2,2];
let isFound = false;
let temp = [];
let currentNum = 0;
let cnt;
for (let i = 0; i < arr.length; i++) {
  cnt = 0
  for (let j = 0; j < arr.length; j++) {
    if(i !==j){
      if (arr[i] === arr[j]) {
cnt++
        temp.push({num : arr[i],cnt : cnt})
        break
      }
    }
  }

}
// console.log(temp);

