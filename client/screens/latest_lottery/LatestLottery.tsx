import { View } from "react-native";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import LatestLotterySorted from "../../components/latest_lottery_sorted/LatestLotterySorted";
import LatestLotteryDate from "../../components/latest_lottery_date/LatestLotteryDate";
const LatestLottery = () => {
  return (
    <View>
      <LoadingScreen />

      {<LatestLotteryDate />}
      <LatestLotterySorted />
    </View>
  );
};

export default LatestLottery;
