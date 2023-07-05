import prize from "./prize";
import { lotteryType } from "../types/type";
const compareNumbers = (userArrLotteryNumbers: lotteryType[], lotteryToCompare: { lotteryNumbers: lotteryType[] }) => {
  let foundsNumbers: any = [];
  let cnt = 0;
  let isSpecial = false;

  for (let i = 0; i < lotteryToCompare?.lotteryNumbers?.length; i++) {
    if (
      userArrLotteryNumbers.filter(
        (currentNum) =>
          currentNum.number === lotteryToCompare?.lotteryNumbers[i]?.number &&
          currentNum.special === lotteryToCompare?.lotteryNumbers[i]?.special
      ).length > 0
    ) {
      if (lotteryToCompare?.lotteryNumbers[i]?.special) {
        isSpecial = true;
      }

      foundsNumbers.push({ number: userArrLotteryNumbers[i].number, special: isSpecial });
      cnt++;
    }
  }

  return { cnt, prize: prize(cnt, isSpecial), special: isSpecial, foundsNumbers };
};

export default compareNumbers;
