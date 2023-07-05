const prize = (num: number, isSpecial: boolean) => {
    let tempNum = 0;
    switch (num) {
      case 1:
        tempNum = 20;
        break;
      case 2:
        tempNum = 200;
        break;
      case 3:
        tempNum = 500;
        break;
      case 4:
        tempNum = 5000;
        break;
      case 5:
        tempNum = 100000;
        break;
      case 6:
        tempNum = 1000000;
    }

    const userPrize = isSpecial ? tempNum * 3 : tempNum * 1;
    return userPrize;
  };
  export default prize