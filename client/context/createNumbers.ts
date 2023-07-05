const createNumbers = () => {
  let tempArr = [];
  let randomNumber;
  let specialNum = { number: Math.floor(Math.random() * 7) + 1, special: true };
  if (specialNum.number === 0) specialNum = { number: Math.floor(Math.random() * 7) + 1, special: true };
  for (let i = 0; i < 6; i++) {
    let add = true;
    randomNumber = { number: Math.floor(Math.random() * 36) + 1, special: false };

    for (let y = 0; y < 36; y++) {
      if (tempArr[y]?.number == randomNumber.number) {
        add = false;
      }
    }
    if (add) {
      tempArr.push(randomNumber);
    } else {
      i--;
    }
  }
  tempArr.push(specialNum);

  return tempArr;
};

export default createNumbers