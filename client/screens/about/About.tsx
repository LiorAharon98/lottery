import { StyleSheet, Text, View, Image } from "react-native";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";

const About = () => {
  const { changeLanguage } = useDataProvider();
  return (
    <Card height={true}>
      <Image style={styles.image} source={require("../../assets/lotto-background.png")} />
      <View style={styles.main_container}>
        <Text style={styles.text}>{changeLanguage("lotto")}</Text>
        <View style={{ width: "90%" }}>
          <Text style={styles.text}>
            {changeLanguage("this lottery development by the full stack developer Lior Aharon")}
          </Text>
        </View>

        <Text style={styles.text}>{changeLanguage("copyright by Lior Aharon 2023")}</Text>
        {/* <AnimateTest /> */}
      </View>
    </Card>
  );
};

export default About;

const styles = StyleSheet.create({
  image: {
    height: "40%",
    width: "70%",
  },
  main_container: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 280,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
