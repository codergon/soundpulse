import { styles } from "./styles";
import { useEffect } from "react";
import colors from "constants/colors";
import { Waveform } from "phosphor-react-native";
import useColorScheme from "hooks/useColorScheme";
import { RgText } from "components/_ui/typography";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSettings } from "providers/SettingsProvider";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface RecordBtnProps {
  startRecording: () => Promise<void>;
}

const RecordBtn = ({ startRecording }: RecordBtnProps) => {
  const { hapticFeedback } = useSettings();

  const theme = useColorScheme();
  const scale = useSharedValue(0.86);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
  }, []);

  return (
    <>
      <View style={[styles.animationBlock]}>
        <AnimatedTouchable
          activeOpacity={0.8}
          style={[styles.outerCircle, animatedStyles]}
          onPress={() => {
            hapticFeedback();
            startRecording();
          }}
        >
          <Animated.View style={[styles.innerCircle, animatedStyles]}>
            <Waveform
              size={50}
              weight="regular"
              color={colors?.[theme].background}
            />
          </Animated.View>
        </AnimatedTouchable>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <RgText style={[styles.animationText]}>Tap to Record</RgText>
        </View>
      </View>
    </>
  );
};

export default RecordBtn;
