import { StyleSheet} from "react-native";
import React, { useState } from "react";
import ModalInfo from "../modal_info/ModalInfo";

const LotteryPageModal = () => {
  const [modalInfo, setModalInfo] = useState<boolean>(false);
  const onInfoModalToggle = (value: boolean) => {
    setModalInfo(value);
  };
  return (
    <>
      <ModalInfo
        closeModal={onInfoModalToggle.bind(this, false)}
        info="lottery-info"
        toggle={modalInfo}
        pressHandler={() => {}}
      />
    </>
  );
};

export default LotteryPageModal;

const styles = StyleSheet.create({});
