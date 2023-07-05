import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal, { GestureResponderEvent } from "react-native-modal";
import Button from "../button/Button";
import { useDataProvider } from "../../context/Data";
import { lotteryType } from "../../types/type";
import ModalLotteryInfo from "../modal_lottery_info/ModalLotteryInfo";
interface props {
  toggle: boolean;
  pressHandler: (e: GestureResponderEvent) => void;
  userLotteryNumArr?: lotteryType[][];
  info: string;
  closeModal?: (e: GestureResponderEvent) => void;
}
const ModalInfo = ({ toggle, pressHandler, userLotteryNumArr, info, closeModal }: props) => {
  const { changeLanguage } = useDataProvider();

  const lotteryInfo = [20, 200, 500, 5000, 100000, 1000000];
  return (
    <Modal isVisible={toggle}>
      <Pressable style={styles.container} onPress={closeModal}>
        {info === "choose-lottery-info" && (
          <View style={styles.modal_container}>
            <View style={styles.header}></View>
            {userLotteryNumArr && userLotteryNumArr.length === 0 ? (
              <Text style={styles.container_text}>
                {changeLanguage("you choose the first column now you will select the second")}
              </Text>
            ) : (
              <View>
                <Text style={styles.container_text}>
                  {changeLanguage(
                    "your final numbers are approve if you would like you can change the numbers in user setting"
                  )}
                </Text>
              </View>
            )}
            <Button onPress={pressHandler}>{changeLanguage("next")}</Button>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

export default ModalInfo;

const styles = StyleSheet.create({
  header: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    height: 40,
    width: "100%",
    backgroundColor: "rgb(66, 159, 255)",
  },
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  modal_container: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    height: 230,
  },

  container_text: {
    fontSize: 18,
    textAlign: "center",
  },
});
