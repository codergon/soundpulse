import {
  CaretRight,
  WaveSine,
  WaveSawtooth,
  WaveSquare,
} from "phosphor-react-native";
import { TouchableOpacity, View, useColorScheme } from "react-native";
import { primaryColor } from "constants/colors";
import { RgText, Text } from "components/_ui/typography";
import { useNavigation } from "@react-navigation/native";

interface SignalDetailsProps {
  item: any;
}

const SignalDetails = ({ item }: SignalDetailsProps) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === "dark";
  const grayColor = isDark ? "#8F8E93" : "#555";
  const iconColor = isDark ? primaryColor : "#000";
  const backgroundColor2 = isDark ? "#2e2e2e" : "#bbb";
  const backgroundColor = isDark ? "#1b1b1b" : "#e5e5e5";

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("soundPreview", item);
      }}
      style={{
        gap: 12,
        backgroundColor,
        borderRadius: 18,
        paddingVertical: 12,
        flexDirection: "row",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 48,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: backgroundColor2,
        }}
      >
        {item?.type === "Dull" ? (
          <WaveSine size={22} weight="bold" color={iconColor} />
        ) : item?.type === "Resonant" ? (
          <WaveSawtooth size={22} weight="bold" color={iconColor} />
        ) : (
          <WaveSquare size={22} weight="bold" color={iconColor} />
        )}
      </View>

      <View
        style={{
          gap: 9,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: 6,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <RgText style={{ fontSize: 16 }}>{item?.type}</RgText>
          <RgText style={{ fontSize: 14, color: grayColor }}>
            {item?.name}
          </RgText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CaretRight size={20} weight="bold" color="#8F8E93" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SignalDetails;
