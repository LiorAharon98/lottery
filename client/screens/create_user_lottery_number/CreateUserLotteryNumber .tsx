import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import Card from "../../components/card/Card";
import ChooseLotteryNumber from "../../components/choose_lottery_number/ChooseLotteryNumber";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/Data";
import Modal from "react-native-modal";
import ModalInfo from "../../components/modal_info/ModalInfo";
interface lotteryType {
  number: number;
  special: boolean;
}
const CreateUserLotteryNumber = ({ navigation }: any) => {
  const { user, changeLanguage, addLotteryNumbersToUser } = useDataProvider();
  const [selectedNumbers, setSelectedNumbers] = useState<lotteryType[]>([]);
  const [selectedSpecialNum, setSelectedSpecialNum] = useState<lotteryType>({} as lotteryType);
  const [userLotteryNumArr, setUserLotteryNum] = useState<lotteryType[][]>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const specialNum: number[] = useMemo(() => {
    let specialNum: number[] = [];
    for (let i = 0; i < 7; i++) {
      specialNum.push(i + 1);
    }
    return specialNum;
  }, []);
  const numbers: number[] = useMemo(() => {
    let numbers: number[] = [];
    for (let i = 0; i < 37; i++) {
      numbers.push(i + 1);
    }
    return numbers;
  }, []);

  const onSelectNumbers = (number: number) => {
    const currentNum = { number, special: false };
    if (selectedNumbers.filter((currentNumber) => currentNumber.number === number).length > 0) {
      return setSelectedNumbers((prev) => prev.filter((currentNumber) => currentNumber.number !== number));
    }
    if (selectedNumbers.length >= 6) return alert("cannot be greater then 6");
    setSelectedNumbers((prev) => [...prev, currentNum]);
  };
  const onSelectedSpecialNumber = (number: number) => {
    const currentNum = { number, special: true };
    if (selectedSpecialNum.number === currentNum.number) {
      return setSelectedNumbers((prev) => prev.filter((currentNum) => currentNum.number !== number));
    }
    return setSelectedSpecialNum(currentNum);
  };
  const pressHandler = async () => {
    const numbers = [...selectedNumbers, selectedSpecialNum];
    setUserLotteryNum((prev) => {
      return [...prev, numbers];
    });

    setToggleModal(false);
    setSelectedNumbers([]);
    setSelectedSpecialNum({} as lotteryType);
  };

  const onToggleModal = () => {
    setToggleModal(true);
  };
  const fetchNumbersToUser = async () => {
    if (userLotteryNumArr.length === 2) {
      await addLotteryNumbersToUser(userLotteryNumArr, user.username);
      navigation.navigate("user-page");
      return;
    }
  };
  useEffect(() => {
    fetchNumbersToUser();
  }, [userLotteryNumArr]);
  return (
    <>
      <ModalInfo userLotteryNumArr={userLotteryNumArr} pressHandler={pressHandler} toggle={toggleModal} />
      <Card >
        <View>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>{userLotteryNumArr.length === 0 ? changeLanguage("first column") : changeLanguage("second column")}!</Text>
            <Text style={styles.header_text}>{changeLanguage("choose numbers")}!</Text>
          </View>

          <ChooseLotteryNumber selectedNumbers={selectedNumbers} onSelectNumbers={onSelectNumbers} numbers={numbers} />

          <View style={styles.header_container}>
            <Text style={styles.header_text}>{changeLanguage("choose numbers")}!</Text>
          </View>
          <ChooseLotteryNumber
            selectSpecialNumbers={selectedSpecialNum}
            onSelectNumbers={onSelectedSpecialNumber}
            numbers={specialNum}
          />
        </View>
        <Button onPress={onToggleModal}>{changeLanguage("next")}</Button>
      </Card>
    </>
  );
};

export default CreateUserLotteryNumber;

const styles = StyleSheet.create({
  header_container: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 100,
    margin: 5,
    backgroundColor: "white",
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
