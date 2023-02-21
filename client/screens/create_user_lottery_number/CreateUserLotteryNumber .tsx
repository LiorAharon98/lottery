import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import Card from "../../components/card/Card";
import ChooseLotteryNumber from "../../components/choose_lottery_number/ChooseLotteryNumber";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/Data";
import Modal from "react-native-modal";
interface lotteryType {
  number: number;
  special: boolean;
}
const CreateUserLotteryNumber = ({ navigation }: any) => {
  const { user, changeLanguage } = useDataProvider();
  const [selectedNumbers, setSelectedNumbers] = useState<lotteryType[]>([]);
  const [selectedSpecialNum, setSelectedSpecialNum] = useState<lotteryType[]>([]);
  const [userLotteryNumArr, setUserLotteryNum] = useState<lotteryType[][]>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { addLotteryNumbersToUser } = useDataProvider();

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
    if (selectedSpecialNum.filter((current) => current.number === number).length > 0)
      setSelectedNumbers((prev) => prev.filter((currentNum) => currentNum.number === number));
    if (selectedSpecialNum.length > 0) return;

    setSelectedSpecialNum((prev) => [...prev, currentNum]);
  };
  const pressHandler = async () => {
    const numbers = [...selectedNumbers, selectedSpecialNum[0]];
    setUserLotteryNum((prev) => {
      return [...prev, numbers];
    });

    setToggleModal(false);
    setSelectedNumbers([]);
    setSelectedSpecialNum([]);
  };

  const onToggleModal = () => {
    setToggleModal(true);
  };

  const test = async () => {
    if (userLotteryNumArr.length === 2) {
      await addLotteryNumbersToUser(userLotteryNumArr, user.username);
      navigation.navigate("user-page");
      return;
    }
  };
  useEffect(() => {
    test();
  }, [userLotteryNumArr]);
  return (
    <View>
      <Modal isVisible={toggleModal}>
        <View style={styles.modal_container}>
          {userLotteryNumArr.length ===0 ? (
            <Text style={styles.container_text}>you choose the first column now you will select the second</Text>
          ) : (
            <Text>your final numbers are approve if you would like you can change the numbers in user setting</Text>
          )}

          <Button onPress={pressHandler}>next</Button>
        </View>
      </Modal>
      <Card height={810}>
        <View>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>{userLotteryNumArr.length ===0 ? "first" : "second"} column!</Text>
            <Text style={styles.header_text}>{changeLanguage("choose numbers")}!</Text>
          </View>

          <ChooseLotteryNumber selectedNumbers={selectedNumbers} onSelectNumbers={onSelectNumbers} numbers={numbers} />

          <View style={styles.header_container}>
            <Text style={styles.header_text}>{changeLanguage("choose numbers")}!</Text>
          </View>
          <ChooseLotteryNumber
            selectedNumbers={selectedSpecialNum}
            onSelectNumbers={onSelectedSpecialNumber}
            numbers={specialNum}
          />
        </View>
        <Button onPress={onToggleModal}>{changeLanguage("next")}</Button>
      </Card>
    </View>
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
  modal_container: {
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    height: 200,
  },
  container_text: {
    fontSize: 20,
    textAlign: "center",
  },
});
