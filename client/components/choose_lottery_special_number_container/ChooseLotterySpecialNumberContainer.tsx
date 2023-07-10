import { StyleSheet } from "react-native";
import ChooseLotterySpecialNumber from "../choose_lottery_special_number/ChooseLotterySpecialNumber";
import { createdNumbers } from "../../types/type";
import { selectedSpecialNumberAction } from "../../store/Index";
import { useDispatch } from "react-redux";
interface props {
  pressHandler: (e: number) => void;
  numbers: createdNumbers;
}
const ChooseLotterySpecialNumberContainer = ({ numbers, pressHandler }: props) => {
  const dispatch = useDispatch();
  const onSelectedSpecialNumber2 = (number: number) => {
    dispatch(selectedSpecialNumberAction.addSpecialNumber(number));
    pressHandler(number);
  };

  return (
    <>
      {numbers.specialNum.map((current, index) => (
        <ChooseLotterySpecialNumber key={index} pressHandler={onSelectedSpecialNumber2} number={current} />
      ))}
    </>
  );
};

export default ChooseLotterySpecialNumberContainer;

const styles = StyleSheet.create({});
