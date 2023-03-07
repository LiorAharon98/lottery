import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal, { GestureResponderEvent } from "react-native-modal";
import Button from "../button/Button";
import { useDataProvider } from "../../context/Data";
interface props {
  toggle: boolean;
  pressHandler: (e: GestureResponderEvent) => void;
  userLotteryNumArr?: {number : number , special : boolean}[][];
}
const ModalInfo = ({ toggle, pressHandler, userLotteryNumArr }: props) => {
  const {changeLanguage} = useDataProvider()
  return (
    <Modal isVisible={toggle}>
      <View style={styles.modal_container}>
        <View style={styles.header}></View>
        {userLotteryNumArr && userLotteryNumArr.length === 0 ? (
          <Text style={styles.container_text}>{changeLanguage('you choose the first column now you will select the second')}</Text>
        ) : (
          <Text style={styles.container_text}>{changeLanguage("your final numbers are approve if you would like you can change the numbers in user setting")}</Text>
        )}

        <Button onPress={pressHandler}>next</Button>
      </View>
    </Modal>
  );
};

export default ModalInfo;

const styles = StyleSheet.create({
  header: {
    height : 30,
    width : '100%',
    backgroundColor :"rgb(66, 159, 255)",
    borderRadius : 5

  },
  modal_container: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    height: 200,
  },
  container_text: {
    fontSize: 18,
    textAlign: "center",
  },
});
