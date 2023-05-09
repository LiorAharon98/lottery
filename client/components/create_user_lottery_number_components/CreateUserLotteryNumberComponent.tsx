import { StyleSheet, Text, View, ScrollView, GestureResponderEvent } from "react-native";
import { useState, useRef, useMemo, useEffect } from "react";
import { useDataProvider } from "../../context/Data";
import ModalInfo from "../modal_info/ModalInfo";
import Card from "../card/Card";
import ChooseLotteryNumberSelected from "../choose_lottery_number_selected/ChooseLotteryNumberSelected";
import Button from "../button/Button";
import React from "react";
import ChooseLotterySpecialNumber from "../choose_lottery_special_number/ChooseLotterySpecialNumber";
import { lotteryType, propsCreateUserLottery, createdNumbers } from "../../types/type";

const CreateUserLotteryNumberComponent = ({
  selectedNumbers,
  selectedSpecialNum,
  userLotteryNumArr,
  pressHandler,
  onSelectNumbers,
  onSelectedSpecialNumber,
}: propsCreateUserLottery) => {
  const { user, changeLanguage, addLotteryNumbersToUser } = useDataProvider();
  const scrollRef = useRef<ScrollView>(null);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [toggleSpecialNum, setToggleSpecialNum] = useState<lotteryType>({} as lotteryType);
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
    setToggleModal(true);
  };
  const pressHandler2 = () => {
    pressHandler();
    setToggleModal(false);
  };

  const onSelectedSpecialNumber2 = (number: number) => {
    setToggleSpecialNum({ number, special: true });
    onSelectedSpecialNumber(number);
  };
  useEffect(() => {
    setToggleSpecialNum({} as lotteryType);
  }, [toggleModal]);
  return (
    <ScrollView ref={scrollRef}>
      <ModalInfo
        info="choose-lottery-info"
        userLotteryNumArr={userLotteryNumArr}
        pressHandler={pressHandler2}
        toggle={toggleModal}
      />
      <Card>
        <View>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>
              {userLotteryNumArr.length === 0 ? changeLanguage("first column") : changeLanguage("second column")}!
            </Text>
            <Text style={styles.header_text}>{changeLanguage("choose numbers")}!</Text>
          </View>
          <View style={styles.number_container}>
            {numbers.numbers.map((current, index) => (
              <ChooseLotteryNumberSelected
                toggleModal={toggleModal}
                numbers={numbers.numbers}
                key={index}
                number={current}
                onPress={onSelectNumbers}
              />
            ))}
          </View>

          <View style={styles.header_container}>
            <Text style={styles.header_text}>{changeLanguage("choose special number")}!</Text>
          </View>

          <View style={styles.number_container}>
            {numbers.specialNum.map((current, index) => (
              <ChooseLotterySpecialNumber
                key={index}
                toggle={toggleSpecialNum}
                number={current}
                onPress={onSelectedSpecialNumber2}
              />
            ))}
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
  selected_numbers: {
    fontSize: 24,
  },
});
