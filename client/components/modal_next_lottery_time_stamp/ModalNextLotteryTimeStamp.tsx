import { StyleSheet, View,Pressable } from "react-native";
import NextLotteryTimeStamp from "../next_lottery_time_stamp/NextLotteryTimeStamp";
import Modal from "react-native-modal";
import UserOptionIcon from "../user_option_icon/UserOptionIcon";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";

const ModalNextLotteryTimeStamp = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const handlePress = () => {
    setToggleModal(prev =>!prev);
  };
  return (
    <View>
      {!toggleModal && (
        <UserOptionIcon onPress={handlePress} text="next lottery">
          <Icon size={35} name="attach-money" />
        </UserOptionIcon>
      )}
      <Modal isVisible={toggleModal}>
        <Pressable onPress={handlePress}>
          <NextLotteryTimeStamp />
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModalNextLotteryTimeStamp;

const styles = StyleSheet.create({});
