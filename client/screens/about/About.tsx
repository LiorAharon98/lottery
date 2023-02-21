import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../../components/card/Card";

const About = () => {
  return (
    <Card height={700}>
      <View>
        <Text>lottery!</Text>
      </View>
      <View>
        <Text>this lottery development by the full stack developer</Text>
        <Text>Lior Aharon</Text>
      </View>
      <View>
        <Text>copyright Lior Aharon 2023</Text>
      </View>
    </Card>
  );
};

export default About;

const styles = StyleSheet.create({});
