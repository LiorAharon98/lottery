import { StyleSheet, Text, View,ScrollView } from "react-native";
import React, { useState } from "react";
import SignCard from "../../components/sign_card/SignCard";
import { useDataProvider } from "../../context/Data";
const SignIn = ({ navigation }: any) => {
  const { selectedUser } = useDataProvider();
  const [toggleError,setToggleError] = useState<string>("")
  const handleFunc = async (userName: string, password: string) => {
   
    const checkUser = await selectedUser(userName, password);
    if (!checkUser) return setToggleError("user not found");
    if (checkUser.lotteryNumbers.length ===0) return navigation.navigate('create-user')

    navigation.navigate('user-page')
  };
  return (
    <>
    <View>
      <SignCard error={toggleError} handleFunc={handleFunc} text="sign in" navigation={navigation} />
    </View>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
