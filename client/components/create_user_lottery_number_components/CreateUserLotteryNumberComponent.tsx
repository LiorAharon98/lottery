import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRef, useMemo, useState } from "react";
import { useDataProvider } from "../../context/Data";
import ModalInfo from "../modal_info/ModalInfo";
import Card from "../card/Card";
import ChooseLotteryNumberSelected from "../choose_lottery_number_selected/ChooseLotteryNumberSelected";
import Button from "../button/Button";
import { propsCreateUserLottery, createdNumbers } from "../../types/type";
import ChooseLotterySpecialNumberContainer from "../choose_lottery_special_number_container/ChooseLotterySpecialNumberContainer";
import { modalAction, selectedNumbersAction, selectedSpecialNumberAction } from "../../store/Index";
import { useDispatch } from "react-redux";

const CreateUserLotteryNumberComponent = ({
  selectedNumbers,
  selectedSpecialNum,
  userLotteryNumArr,
  pressHandler,
  onSelectNumbers,
  onSelectedSpecialNumber,
}: propsCreateUserLottery) => {
  const { changeLanguage } = useDataProvider();
  const dispatch = useDispatch();
  const scrollRef = useRef<ScrollView>(null);
  const numbers: createdNumbers = useMemo(() => {
    let specialNum: number[] = [];
    let numbers: number[] = [];
    for (let i = 0; i < 37; i++) {
      if (i < 7) {
        specialNum.push(i + 1);
      }
      numbers.push(i + 1);
    }
    return { numbers, specialNum };
  }, []);

  const onToggleModal = () => {
    if (selectedNumbers.length !== 6 || !selectedSpecialNum.number)
      return alert("must choose 6 numbers and 1 special number");
    dispatch(modalAction.toggleOn());
    dispatch(selectedNumbersAction.resetNumbers());
    dispatch(selectedSpecialNumberAction.resetNumbers());
  };
  const pressHandler2 = () => {
    pressHandler();
    dispatch(modalAction.toggleOFF());
  };

  return (
    <ScrollView ref={scrollRef}>
      <ModalInfo info="choose-lottery-info" userLotteryNumArr={userLotteryNumArr} pressHandler={pressHandler2} />
      <Card>
        <View>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>
              {userLotteryNumArr.length === 0 ? changeLanguage("first column") : changeLanguage("second column")}!
            </Text>
            <Text style={styles.header_text}>{changeLanguage("choose numbers")}!</Text>
          </View>
          <View style={styles.number_container}>
            {numbers.numbers.map((current) => (
              <ChooseLotteryNumberSelected
                numbers={numbers.numbers}
                key={current}
                number={current}
                onPress={onSelectNumbers}
              />
            ))}
          </View>

          <View style={styles.header_container}>
            <Text style={styles.header_text}>{changeLanguage("choose special number")}!</Text>
          </View>

          <View style={styles.number_container}>
            <ChooseLotterySpecialNumberContainer  numbers={numbers} pressHandler={onSelectedSpecialNumber} />
          </View>
        </View>
        <Button onPress={onToggleModal}>{changeLanguage(userLotteryNumArr.length < 1 ? "next" : "finish")}</Button>
      </Card>
    </ScrollView>
  );
};

export default CreateUserLotteryNumberComponent;

const styles = StyleSheet.create({
  header_container: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 100,
    margin: 5,
    backgroundColor: "white",
  },
  number_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  header_text: {
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
