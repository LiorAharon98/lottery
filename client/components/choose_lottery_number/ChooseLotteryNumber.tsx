import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface props {
  number: number;
  onSelectNumbers: (number: number) => void;
  selectedNumbers: { number: number }[];
}
const ChooseLotteryNumber = ({ number, onSelectNumbers, selectedNumbers }: props) => {
  return (
    <View style={styles.container}>

    <Text
      style={
        selectedNumbers.filter((currentNumber) => currentNumber.number === number).length > 0
        ? styles.selected_number
        : styles.un_selected_number
      }
      onPress={onSelectNumbers.bind(this, number)}
      >
      {number}
    </Text>
      </View>
  );
};

export default ChooseLotteryNumber;

const styles = StyleSheet.create({
  container : {
  },
  un_selected_number: {
    textAlign : 'center',
    fontSize: 24,
    margin: 6,
    padding: 4,
    borderWidth: 1,
    borderRadius: 20,
    height :40,
    width: 40,
  },
  selected_number: {
    textAlign : 'center',
    backgroundColor:'rgb(21, 165, 241)',
    fontSize: 24,
    margin: 6,
    padding: 4,
    borderWidth: 0,
    color : 'white',
    borderRadius : 20,
    height : 40,
    width: 40,
  },
});
