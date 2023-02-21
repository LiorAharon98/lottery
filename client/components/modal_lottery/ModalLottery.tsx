import { StyleSheet, View } from "react-native";
import CreateModal from "../create_modal/CreateModal";
import { GestureResponderEvent } from "react-native-modal";
interface props {
  countGuessAndPrizes: { counter: number; prize: number }[];
  isWon: boolean;
  closeModal: (e: GestureResponderEvent) => void;
}
const ModalLottery = ({ countGuessAndPrizes, isWon, closeModal }: props) => {
  return (
    <View>
      <CreateModal
        closeModal={closeModal}
        activateModal={isWon}
        guessNumber={countGuessAndPrizes[0].counter + countGuessAndPrizes[1].counter}
        prizeNumber={countGuessAndPrizes[0].prize + countGuessAndPrizes[1].prize}
      />
    </View>
  );
};

export default ModalLottery;

const styles = StyleSheet.create({});
