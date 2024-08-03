import { StyleSheet, View, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
import { Table, Row, Rows } from "react-native-table-component";
import { useDataProvider } from "../../context/Data";
import { currentLottery, columType } from "../../types/type";
import { LinearGradient } from "expo-linear-gradient";
interface props {
  randomLotteryNumbers: currentLottery;
  countGuessAndPrizes: { firstColumn: columType; secondColumn: columType };
  activateModal : string
}
const ModalLottery2 = ({ countGuessAndPrizes, activateModal,onModalToggle }: props) => {
  const { changeLanguage} = useDataProvider();

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
 const closeModal =()=>{
    onModalToggle('')
 }
  return (
    <Modal isVisible={activateModal ==='compare'}>
      <Pressable onPress={closeModal}>
        <View style={styles.page_container}>
          <View style={styles.container}>
            {countGuessAndPrizes.firstColumn.cnt || countGuessAndPrizes.secondColumn.cnt ? (
              <>
                <LinearGradient
                  style={styles.header}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={["rgb(55, 103, 255)", "rgb(55, 103, 255)"]}
                ></LinearGradient>
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

export default ModalLottery2;

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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 8,
    paddingLeft: 5,
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
