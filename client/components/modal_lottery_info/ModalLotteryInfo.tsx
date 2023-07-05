import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal"
import { useDataProvider } from "../../context/Data";

interface props {
  lotteryInfo: number[];
  toggle : string;
  onModalToggle : (string :string)=>void
}
const ModalLotteryInfo = ({toggle ,onModalToggle}: props) => {
  const { changeLanguage } = useDataProvider();
  const lotteryInfo = [20, 200, 500, 5000, 100000, 1000000];
  return (

 <Modal  isVisible={toggle ==='info'}>
  <Pressable style={{height :'95%',width:'100%' , justifyContent:'center'}} onPress={onModalToggle.bind(this,'')}>

    <View style={styles.modal_info_container}>
      <View style={styles.header}></View>
      <View style={styles.lottery_info_container}>
        {lotteryInfo.map((info: number, index: number) => (
          <Text key={index}>
            {index + 1} {changeLanguage("matches is")} {""}
            {info}₪
          </Text>
        ))}

        <Text>{changeLanguage("special number will triple the prize")} </Text>
        <Text>{changeLanguage("lotterys will be every sunday and wednesday")} </Text>
      </View>
    </View>
        </Pressable>
        </Modal>
  );
};

export default ModalLotteryInfo;

const styles = StyleSheet.create({
  lottery_info_container: {
    justifyContent: "space-around",
    height: "90%",
  },
  modal_info_container: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    height: 400,
  },
  header: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    height: 40,
    width: "100%",
    backgroundColor: "rgb(66, 159, 255)",
  },
});
