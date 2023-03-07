import { StyleSheet, View, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
import { useDataProvider } from "../../context/Data";
import { GestureResponderEvent } from "react-native-modal";
interface props {
  countGuessAndPrizes: { counter: number; prize: number }[];
  closeModal: (e: GestureResponderEvent) => void;
  activateModal: boolean;
}

const ModalLottery = ({ closeModal, activateModal, countGuessAndPrizes }: props) => {
  const { changeLanguage } = useDataProvider();

  return (
    <Modal isVisible={activateModal}>
      <Pressable onPress={closeModal}>
        <View style={styles.page_container}>
          <View style={styles.container}>
            {countGuessAndPrizes[0].counter || countGuessAndPrizes[1].counter ? (
              <>
                <View style={styles.header}></View>
                <View style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Text>{changeLanguage("congratulations")} !</Text>
                  <Text>{changeLanguage("first column")}</Text>
                  <Text>
                    {changeLanguage("you guess")} {countGuessAndPrizes[0].counter} {changeLanguage("numbers")}
                  </Text>
                  <Text>
                    {changeLanguage("you won")} {countGuessAndPrizes[0].prize}₪
                  </Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Text>{changeLanguage("second column")}</Text>
                  <Text>
                    {changeLanguage("you guess")} {countGuessAndPrizes[1].counter} {changeLanguage("numbers")}
                  </Text>
                  <Text>
                    {changeLanguage("you won")} {countGuessAndPrizes[1].prize}₪
                  </Text>
                </View>
                <Text>
                  {changeLanguage("total")} : {countGuessAndPrizes[0].prize + countGuessAndPrizes[1].prize}₪
                </Text>
              </>
            ) : (
              <View>
                <Text>not found matches with your numbers</Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalLottery;

const styles = StyleSheet.create({
  page_container: {
    height: "105%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    borderRadius: 15,
    width: "95%",
    height: "40%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  header: {
    paddingTop: 8,
    paddingLeft: 5,
    backgroundColor: "rgb(66, 159, 255)",
    width: "100%",
    height: 40,
  },
});
