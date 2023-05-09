import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
interface props {
  changeLoopNum: (e: number) => void;
  toggle: boolean;
  closeToggle: () => void;
}
const OddsPicker = ({ changeLoopNum, toggle, closeToggle }: props) => {
  const text = [1, 2, 3, 4, 5, 6];
  const pressHandler = (number: number) => {
    changeLoopNum(number);
    closeToggle();
  };
  return (
    <Modal isVisible={toggle}>
      <View style={styles.container}>
        {text.map((current) => (
          <Text key={current} onPress={pressHandler.bind(this, current)} style={styles.text}>
            {current}
          </Text>
        ))}
      </View>
    </Modal>
  );
};

export default OddsPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    height: 330,
    borderRadius: 20,
  },
  text: {
    width: "100%",
    height: 35,
    textAlign: "center",
    fontSize: 20,
    color: "rgb(21, 165, 241)",
  },
});
