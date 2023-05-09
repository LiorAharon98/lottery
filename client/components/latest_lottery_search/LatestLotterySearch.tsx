import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import CalenderIcon from "react-native-vector-icons/FontAwesome"
import Icon from "react-native-vector-icons/Feather";
import { currentLottery } from "../../types/type";
interface props {
  handleDate: (date: number) => void;
  allLotterySort: currentLottery[];
}
const LatestLotterySearch = ({ handleDate, allLotterySort }: props) => {
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const confirmDate = (date: { nativeEvent: { timestamp: number } }) => {
    handleDate(date.nativeEvent.timestamp);

    setToggleSearch(false);
  };
  const handlePress = () => {
    setToggleSearch(true);
  };

  const handleInp = (value: string) => {
    const numbers = allLotterySort.find((current) =>
      current.lotteryNumbers.find((current2) => current2.number === Number(value))
    );
    console.log(numbers);
  };
  return (
    <View>
      <CalenderIcon onPress={handlePress} style={styles.icon} name="calendar" />
      {/* <TextInput onChangeText={handleInp} keyboardType="number-pad" style={styles.input} /> */}
      {toggleSearch && <DateTimePickerAndroid la display="default" onChange={confirmDate} value={new Date()} />}
    </View>
  );
};

export default LatestLotterySearch;

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    color :"rgb(21, 165, 241)",
    height: 40,
    width: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    width: 180,
    height: 40,
    backgroundColor: "rgb(21, 165, 241)",
  },
});
