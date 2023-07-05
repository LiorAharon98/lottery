import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDataProvider } from "../../context/Data";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import ConnectBank from "../../components/connect_bank/ConnectBank";
import { useSelector } from "react-redux";
const BankScreen = () => {
  const {changeLanguage } = useDataProvider();
  const {bank} = useSelector(state=>state.user)
  return (
    <>
      <UserProfileDetails />
      <View style={styles.container}>


        {bank ? <Text>{changeLanguage('bank connected')}</Text> : <ConnectBank />}

      </View>
    </>
  );
};

export default BankScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 300,
    justifyContent: "space-around",
  },
  left:{
    width :'30%',
    height :'100%'
  },
  right:{
    justifyContent :'space-around',
    alignItems :'center',
    height :'100%',
    width :'70%'
  }
});
