import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRef } from "react";
import { useDataProvider } from "../../context/Data";
import CreateUserLotteryNumberComponent from "../../components/create_user_lottery_number_components/CreateUserLotteryNumberComponent";
import { lotteryType } from "../../types/type";
import { useSelector } from "react-redux";
const CreateUserLotteryNumber = ({ navigation }: any) => {
  const { addLotteryNumbersToUser } = useDataProvider();
  const user = useSelector((state) => state.user);
  let selectedNumbers: lotteryType[] = [];
  let selectedSpecialNum: lotteryType = {} as lotteryType;
  let userLotteryNumArr: lotteryType[][] = [];
  const scrollRef = useRef<ScrollView>(null);

  const onSelectNumbers = (number: number) => {
    let error = false;
    const currentNum = { number, special: false };

    for (let i = 0; i < selectedNumbers.length; i++) {
      if (selectedNumbers[i].number === number) {
        selectedNumbers.splice(i, 1);
        error = true;
      }
    }
    if (selectedNumbers.length >= 6) {
      alert("cannot be greater then 6");
      error = true;
    }
    if (error) return error;
    selectedNumbers.push(currentNum);
  };
  const onSelectedSpecialNumber = (number: number) => {
    let error = false;
    const currentNum = { number, special: true };
    if (selectedSpecialNum.number === currentNum.number) {
      selectedNumbers.filter((currentNum) => currentNum.number !== number);
      return (error = true);
    }
    selectedSpecialNum.number = currentNum.number;
    selectedSpecialNum.special = currentNum.special;
  };
  const pressHandler = async () => {
    const numbers = [...selectedNumbers, selectedSpecialNum];
    userLotteryNumArr.push(numbers);
    await fetchNumbersToUser();
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });

    selectedNumbers = [];
    selectedSpecialNum = {} as lotteryType;
  };
  const fetchNumbersToUser = async () => {
    if (userLotteryNumArr.length === 2) {
      await addLotteryNumbersToUser(userLotteryNumArr, user.username);
      userLotteryNumArr = [];
      navigation.navigate("user-page");
      return;
    }
  };

  return (
    <ScrollView ref={scrollRef}>
      <CreateUserLotteryNumberComponent
        onSelectNumbers={onSelectNumbers}
        pressHandler={pressHandler}
        selectedNumbers={selectedNumbers}
        selectedSpecialNum={selectedSpecialNum}
        userLotteryNumArr={userLotteryNumArr}
        onSelectedSpecialNumber={onSelectedSpecialNumber}
      />
    </ScrollView>
  );
};

export default CreateUserLotteryNumber;

const styles = StyleSheet.create({});
