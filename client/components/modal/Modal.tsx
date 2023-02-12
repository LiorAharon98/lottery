import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useDataProvider } from "../../context/Data";
import CreateModal from "../create_modal/CreateModal";
interface props {
  counter: number;
  guessNumber: number;
}
const Modal = ({ counter, guessNumber }: props) => {
  const { randomLotteryNumbers, user, userEarnedLottery } = useDataProvider();
  const [isWon, setIsWon] = useState<boolean>(false);
  const closeModal = () => {
    setIsWon(false);
  };
  useEffect(() => {
    if (counter !== 0) {
      userEarnedLottery(user.username, guessNumber);
      setIsWon(true);
    }
  }, []);
  return (
    <View>
      <CreateModal closeModal={closeModal} activateModal={isWon} guessNumber={counter} prizeNumber={guessNumber} />
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({});
