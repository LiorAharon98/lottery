import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/Data";
import OddsPicker from "../../components/odds_picker/OddsPicker";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import OddsFoundNumbers from "../../components/odds_found_numbers/OddsFoundNumbers";
import Icon from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { foundsNumbersType } from "../../types/type";
const OddsPage = () => {
  const [loopNum, setLoopNum] = useState<number>(0);
  const [foundNum, setFoundNum] = useState<foundsNumbersType>({} as foundsNumbersType);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { compareNumbers, user,changeLanguage } = useDataProvider();

  const handlePress = async (column: string) => {
    setLoading(true);
    await calculatorLoops(column);
    setLoading(false);
  };

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

  const changeLoopNum = (number: number) => {
    setLoopNum(number);
  };
  const calculatorLoops = async (column: string) => {
    await fetch("https://www.google.com/");
    let howManyLoop = 0;
    let isWon = false;
    let founds;

    while (!isWon) {
      founds = compareNumbers(user.lotteryNumbers[column], { lotteryNumbers: createNumbers() });

      howManyLoop++;
      if (founds.cnt === loopNum) isWon = true;
    }
    setFoundNum({ foundCnt: howManyLoop, foundNumbers: founds.foundsNumbers });
  };
  return (
    <Card height={true}>
      <UserProfileDetails />
      <View style={styles.container}>
        <View style={styles.choose_numbers_container}>
          <Text style={styles.text}>{changeLanguage("choose how many matches")}?</Text>
          <Icon style={styles.icon} onPress={setToggleModal.bind(this, true)} name="caretdown" />
        </View>

        <OddsPicker closeToggle={setToggleModal.bind(this, false)} toggle={toggleModal} changeLoopNum={changeLoopNum} />
        {Boolean(loopNum) && (
          <>
            <Text style={styles.text}>{loopNum}</Text>
            <Animatable.View duration={700} animation={"slideInUp"} style={styles.button_container}>
              <Button onPress={handlePress.bind(this, "firstColumn")}>first column</Button>
              <Button onPress={handlePress.bind(this, "secondColumn")}>second column</Button>
            </Animatable.View>
          </>
        )}
        {foundNum.foundCnt > 0 && <OddsFoundNumbers foundNum={foundNum} />}
        {loading && (
          <View>
            <ActivityIndicator color={"rgb(55, 185, 255)"} size={30} />
          </View>
        )}
      </View>
    </Card>
  );
};

export default OddsPage;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  choose_numbers_container: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 115,
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  icon: {
    color: "rgb(21, 165, 241)",
    padding: 20,
  },
});
