import { StyleSheet, View } from "react-native";
import { useState } from "react";
import Button from "../button/Button";
import ModalLotteryInfo from "../modal_lottery_info/ModalLotteryInfo";
import ModalLottery2 from "../modal_lottery2/ModalLottery2";
import { useDataProvider } from "../../context/Data";
const LotteryPageButtons = ({ countGuessAndPrizes }: any) => {
  const [toggleModal, setToggleModal] = useState<string>("");
  const { changeLanguage } = useDataProvider();
  const onModalToggle = (value: string) => {
    setToggleModal(value);
  };
  return (
    <>
      {toggleModal === "info" && (
        <ModalLotteryInfo onModalToggle={onModalToggle} toggle={toggleModal} lotteryInfo={[1, 2, 3, 4, 5, 6]} />
      )}

      {toggleModal === "compare" && (
        <ModalLottery2
          onModalToggle={onModalToggle}
          activateModal={toggleModal}
          countGuessAndPrizes={countGuessAndPrizes}
        />
      )}
      <View style={styles.button_container}>
        <Button width={170} onPress={onModalToggle.bind(this, "Compare")}>
          {changeLanguage('Compare')}
        </Button>
        <Button width={170} onPress={onModalToggle.bind(this, "Info")}>
           {changeLanguage('Info')}
        </Button>
      </View>
    </>
  );
};

export default LotteryPageButtons;

const styles = StyleSheet.create({
  button_container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
