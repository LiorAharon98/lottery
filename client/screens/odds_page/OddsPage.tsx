import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import OddsFoundNumbers from "../../components/odds_found_numbers/OddsFoundNumbers";
import * as Animatable from "react-native-animatable";
import LoadingIndicator from "../../components/loading_indicator/LoadingIndicator";
import { foundsNumbersType } from "../../types/type";
import ModalOddsPage from "../../components/modal_odds_page/ModalOddsPage";
import { useSelector } from "react-redux";
import compareNumbers from "../../context/compareNumbers";
import createNumbers from "../../context/createNumbers"
const OddsPage = () => {
  const [loopNum, setLoopNum] = useState<number>(0);
  const [foundNum, setFoundNum] = useState<foundsNumbersType>({} as foundsNumbersType);
  const { changeLanguage } = useDataProvider();
  const user = useSelector((state) => state.user);
  const calculatorLoops = async (column: string) => {
    await fetch("https://www.google.co.il/");
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
  const changeLoopNum = (number: number) => {
    setLoopNum(number);
  };

  return (
    <Card height={true}>
      <UserProfileDetails />
      <View style={styles.container}>
        <View style={styles.choose_numbers_container}>
          <Text style={styles.text}>{changeLanguage("choose how many matches")}?</Text>
          <ModalOddsPage changeLoopNum={changeLoopNum} />
        </View>

        {Boolean(loopNum) && (
          <>
            <Text style={styles.text}>{loopNum}</Text>
            <Animatable.View duration={700} animation={"slideInUp"} style={styles.button_container}>
              <LoadingIndicator calculatorLoops={calculatorLoops} />
            </Animatable.View>
          </>
        )}
        {foundNum.foundCnt > 0 && <OddsFoundNumbers foundNum={foundNum} />}
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
});
