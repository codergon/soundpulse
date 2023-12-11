import { styles } from "./styles";
import { View } from "react-native";
import { Text } from "components/_ui/typography";

const Splash = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[{ color: "black", marginVertical: 100 }]}>Splash</Text>
    </View>
  );
};

export default Splash;
