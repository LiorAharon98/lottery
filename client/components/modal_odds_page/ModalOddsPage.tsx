import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import OddsPicker from "../odds_picker/OddsPicker";
import React, { useState } from "react";

const ModalOddsPage = ({ changeLoopNum }: any) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  return (
    <>
      <MaterialIcons
        style={styles.icon}
        onPress={setToggleModal.bind(this, true)}
        name="arrow-drop-down"
        size={27}
        color="black"
      />
      <OddsPicker closeToggle={setToggleModal.bind(this, false)} toggle={toggleModal} changeLoopNum={changeLoopNum} />
    </>
  );
};

export default ModalOddsPage;

const styles = StyleSheet.create({
  icon: {
    color: "rgb(55, 103, 255)",
    padding: 20,
  },
});
