import { StyleSheet, View, Text, ScrollView } from "react-native";
import Modal from "react-native-modal";
interface props {
  changeLoopNum: (e: number) => void;
  toggle: boolean;
  closeToggle: () => void;
}
const OddsPicker = ({ changeLoopNum, toggle, closeToggle }: props) => {
  const text = [1, 2, 3, 4, 5, 6];
  const pressHandler = (number: number) => {
    changeLoopNum(number);
    closeToggle();
  };
  return (
    <>
      <Modal backdropOpacity={0.95} backdropColor="white" isVisible={toggle}>
        <View style={styles.container}>
          <ScrollView style={styles.text_container}>
            {text.map((current) => (
              <Text key={current} onPress={pressHandler.bind(this, current)} style={styles.text}>
                {current}
              </Text>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default OddsPicker;

const styles = StyleSheet.create({
  container: {
    height: 140,
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    marginTop: 20,
  },
  text_container: {
    width: "100%",
  },
});
