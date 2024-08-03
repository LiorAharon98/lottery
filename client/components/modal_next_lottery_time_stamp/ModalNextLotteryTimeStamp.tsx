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
        <UserOptionIcon backgroundColor="rgb(116, 166, 247)" onPress={handlePress} text="next lottery">
          <Icon color={'white'} size={35} name="attach-money" />
        </UserOptionIcon>
      )}
      <Modal backdropOpacity={0.95} backdropColor="white" isVisible={toggleModal}>
        <Pressable onPress={handlePress}>
          <NextLotteryTimeStamp />
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModalNextLotteryTimeStamp;

const styles = StyleSheet.create({});
