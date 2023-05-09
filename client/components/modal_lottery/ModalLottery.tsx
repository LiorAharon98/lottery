import { StyleSheet, View, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
import { Table, Row, Rows } from "react-native-table-component";
import { useDataProvider } from "../../context/Data";
import { modalLotteryProps } from "../../types/type";

const ModalLottery = ({ closeModal, activateModal, countGuessAndPrizes }: modalLotteryProps) => {
  const { changeLanguage } = useDataProvider();
  const rows = [changeLanguage("column"), changeLanguage("guess"), changeLanguage("prize"), changeLanguage("special")];
  const columns = [
    [
      changeLanguage("first"),
      countGuessAndPrizes.firstColumn.cnt,
      countGuessAndPrizes.firstColumn.prize + "₪",
      changeLanguage(countGuessAndPrizes.firstColumn.special ? "yes" : "no"),
    ],
    [
      changeLanguage("second"),
      countGuessAndPrizes.secondColumn.cnt,
      countGuessAndPrizes.secondColumn.prize + "₪",
      changeLanguage(countGuessAndPrizes.secondColumn.special ? "yes" : "no"),
    ],
  ];

  return (
    <Modal isVisible={activateModal}>
      <Pressable onPress={closeModal}>
        <View style={styles.page_container}>
          <View style={styles.container}>
            {countGuessAndPrizes.firstColumn.cnt || countGuessAndPrizes.secondColumn.cnt ? (
              <>
                <View style={styles.header}></View>
                <View style={styles.table_container}>
                  <Text style={{ textAlign: "center", marginBottom: 15 }}>{changeLanguage("congratulations")} !</Text>
                  <Table style={{ height: 150 }} borderStyle={{ borderWidth: 1, borderColor: "black" }}>
                    <Row textStyle={styles.text_style} style={{ height: 50 }} data={rows} />
                    <Rows textStyle={styles.text_style} style={{ height: 50 }} data={columns} />
                  </Table>
                </View>

                <Text>
                  {changeLanguage("total")} :{" "}
                  {countGuessAndPrizes.firstColumn.prize + countGuessAndPrizes.secondColumn.prize}₪
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
    borderRadius: 25,
    width: "105%",
    height: "45%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  header: {
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    paddingTop: 8,
    paddingLeft: 5,
    backgroundColor: "rgb(66, 159, 255)",
    width: "100%",
    height: 40,
  },
  table_container: {
    height: 180,
    width: "98%",
  },
  text_style: {
    textAlign: "center",
  },
});
