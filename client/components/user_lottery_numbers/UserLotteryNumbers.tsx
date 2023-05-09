import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDataProvider } from "../../context/Data";
import Number from "../number/Number";

interface columnProps {
  column: string;
}

const UserLotteryNumbers = ({ column }: columnProps) => {
  const { user, changeLanguage } = useDataProvider();
  
  return (
    <>
      <Text>{column === 'firstColumn' ? changeLanguage("first") : changeLanguage("second")}</Text>
      <View style={styles.user_number}>
        {user.lotteryNumbers[column].map((number: { number: number; special: boolean }, index: number) => {
          return (
            <Number isSpecial={number.special} key={index}>
              {number.number}
            </Number>
          );
        })}
      </View>
    </>
  );
};

export default UserLotteryNumbers;

const styles = StyleSheet.create({
  user_number: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
  },
});
