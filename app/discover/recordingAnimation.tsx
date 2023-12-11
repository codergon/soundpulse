import { styles } from "./styles";
import layout from "constants/layout";
import LottieView from "lottie-react-native";
import { Waveform } from "phosphor-react-native";
import useColorScheme from "hooks/useColorScheme";
import { RgText } from "components/_ui/typography";
import { TouchableOpacity, View } from "react-native";
import colors, { primaryColor } from "constants/colors";
import { useSettings } from "providers/SettingsProvider";

interface RecordingAnimationProps {
  stopRecording: () => Promise<void>;
}

const RecordingAnimation = ({ stopRecording }: RecordingAnimationProps) => {
  const theme = useColorScheme();
  const { hapticFeedback } = useSettings();

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.animationBlock]}
        onPress={() => {
          hapticFeedback("Light");
          stopRecording();
        }}
      >
        <View
          style={[
            {
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <LottieView
            loop
            autoPlay
            style={{
              marginTop: 3,
              marginRight: 10,
              width: layout.window.width,
              maxHeight: layout.window.width,
              backgroundColor: "transparent",
            }}
            source={require("assets/lotties/pulse.json")}
          />

          <View
            style={{
              width: 70,
              height: 70,
              zIndex: 20,
              borderRadius: 48,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors?.[theme].background,
            }}
          >
            <Waveform size={40} weight="regular" color={primaryColor} />
          </View>
        </View>

        <View
          style={{
            gap: 8,
            marginTop: 20,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <RgText style={[styles.animationText]}>Recording</RgText>
          <RgText
            style={[
              {
                fontSize: 15,
                color: "#888",
              },
            ]}
          >
            Click anywhere to stop
          </RgText>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default RecordingAnimation;
