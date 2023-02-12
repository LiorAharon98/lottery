import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SignCard from "../../components/sign_card/SignCard";
import { useDataProvider } from "../../context/Data";

const SignUp = ({ navigation }: any) => {
  const [toggleError,setToggleError] = useState<string>('')
  const {addUser} = useDataProvider()
  const handleFunc = async(username : string ,password: string)=>{
    const user = await addUser(username,password)
    if (!user)return setToggleError("user already exist")
    navigation.navigate('create-user')
  }
  return (
    <View>
      <SignCard error={toggleError} handleFunc={handleFunc} text="sign up" navigation={navigation} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
