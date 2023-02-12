import { StyleSheet, Text, View } from "react-native";
import React, { useState,useEffect } from "react";
import Card from "../../components/card/Card";
import ChooseLotteryNumber from "../../components/choose_lottery_number/ChooseLotteryNumber";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/Data";
const CreateUserLotteryNumber = ({ navigation }: any) => {
  const { user } = useDataProvider();
  const [selectedNumbers, setSelectedNumbers] = useState<{ number: number; special: boolean }[]>([]);
  const [selectedSpecialNum, setSelectedSpecialNum] = useState<{ number: number; special: boolean }[]>([]);
  const { addLotteryNumbersToUser } = useDataProvider();

  let specialNum: number[] = [];
  for (let i = 0; i < 7; i++) {
    specialNum.push(i+1);
  }
  let numbers : number[] = [];
  for (let i  = 0; i < 37; i++) {
    numbers.push(i+1);
  }

  const onSelectNumbers = (number: number) => {
    const currentNum = { number, special : false };
    if (selectedNumbers.filter((currentNumber) => currentNumber.number === number).length >0){
      return setSelectedNumbers((prev) => prev.filter((currentNumber) => currentNumber.number !== number));
    }
    if (selectedNumbers.length >= 6) return alert("cannot be greater then 6");
    setSelectedNumbers((prev) => [...prev, currentNum]);
  };
  const onSelectedSpecialNumber = (number: number) => {
    const currentNum = { number, special : true };
    if (selectedSpecialNum.filter((current) => current.number === number).length>0)
    setSelectedNumbers((prev) => prev.filter((currentNum) => currentNum.number === number));
    if(selectedSpecialNum.length>0)return
    
    setSelectedSpecialNum((prev) => [...prev, currentNum]);
  };
  const pressHandler = async () => {
    const numbers = [...selectedNumbers, selectedSpecialNum[0]];
    await addLotteryNumbersToUser(numbers, user.username);
    navigation.navigate("user-page");
  };
  return (
    <View>
      <Card>
        <View>
          <View style={styles.header_container}>

          <Text style={styles.header_text}>choose numbers!</Text>
          </View>
          <View style={styles.number_container}>
            {numbers.map((number, index) => {
              return (
                <ChooseLotteryNumber
                  key={index + 1}
                  selectedNumbers={selectedNumbers}
                  onSelectNumbers={onSelectNumbers}
                  number={number}
                />
              );
            })}
          </View>
          <View style={styles.header_container} >

          <Text style={styles.header_text}>special number</Text>
          </View>
          <View style={styles.number_container}>
            {specialNum.map((num, index) => (
              <ChooseLotteryNumber
                key={num}
                selectedNumbers={selectedSpecialNum}
                onSelectNumbers={onSelectedSpecialNumber}
                number={num}
              />
            ))}
          </View>
        </View>
        <View style={styles.selected_numbers_container}>
          {/* {selectedNumbers.map((number) => {
            return (
              <Text key={number.number} style={styles.selected_numbers}>
                {number.number}
              </Text>
            );
          })} */}
        </View>
        <View style={styles.selected_numbers_container}>
          {/* <Text style={styles.selected_numbers}>special is {selectedSpecialNum[0]?.number}</Text> */}
        </View>
        <Button onPress={pressHandler}>next</Button>
      </Card>
    </View>
  );
};

export default CreateUserLotteryNumber;

const styles = StyleSheet.create({
  number_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 10,
  },
  header_container:{
    alignItems : 'center',
    justifyContent : 'center',
height:100,
margin:5,
backgroundColor : 'white'
  },
  header_text: {
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  selected_numbers_container: {
    marginLeft: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    justifyContent: "space-around",
  },
  selected_numbers: {
    fontSize: 24,
  },
});
