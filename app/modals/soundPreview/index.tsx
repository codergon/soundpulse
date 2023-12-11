import { styles } from "./styles";
import Toast from "react-native-toast-message";
import { primaryColor } from "constants/colors";
import useColorScheme from "hooks/useColorScheme";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { BottomSheetParams } from "typings/navigation";
import { useSettings } from "providers/SettingsProvider";
import { AVPlaybackStatusSuccess, Audio } from "expo-av";
import { RgText, Text } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScreenProps } from "@th3rdwave/react-navigation-bottom-sheet";
import {
  X,
  Play,
  Pause,
  WaveSine,
  WaveSquare,
  WaveSawtooth,
} from "phosphor-react-native";

const SoundPreview = ({
  route,
  navigation,
}: BottomSheetScreenProps<BottomSheetParams, "soundPreview">) => {
  const details = route.params;

  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const darkColor = isDark ? "#fff" : "#000";
  const grayColor = isDark ? "#777" : "#555";
  const borderColor = isDark ? "#333" : "#ccc";
  const iconColor = isDark ? primaryColor : "#000";
  const backgroundColor2 = isDark ? "#2e2e2e" : "#bbb";
  const backgroundColor = isDark ? "#1b1b1b" : "#e8e8e8";

  // saved signals
  const { signals, setSignals } = useSettings();

  // audio states
  const playbackObject = useRef<Audio.Sound>(new Audio.Sound());
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>(
    {} as AVPlaybackStatusSuccess
  );

  useEffect(() => {
    const setupSound = async () => {
      await playbackObject.current?.loadAsync({
        uri: details?.uri,
      });

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      await playbackObject.current?.setVolumeAsync(1);
    };

    setupSound();

    playbackObject.current?.setOnPlaybackStatusUpdate((status) => {
      setStatus(status as AVPlaybackStatusSuccess);
    });
    return () => {
      playbackObject.current?.unloadAsync();
    };
  }, []);

  const togglePlayback = async () => {
    if (status?.isPlaying) {
      await playbackObject.current?.pauseAsync();
    } else {
      if (status?.positionMillis === status?.durationMillis) {
        await playbackObject.current?.replayAsync();
      } else {
        await playbackObject.current?.playAsync();
      }
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <View style={[styles.header, { borderColor }]}>
        <View
          style={{
            gap: 6,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Text style={[{ fontSize: 18 }]}>Sound details</Text>
          <RgText style={[{ fontSize: 13, color: grayColor }]}>
            Info about the received sound and its classification
          </RgText>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[
            {
              padding: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <X size={18} weight="bold" color={darkColor} />
        </TouchableOpacity>
      </View>

      <View style={[styles.content]}>
        <View
          style={{
            gap: 12,
            backgroundColor,
            borderRadius: 18,
            paddingRight: 10,
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
            {details?.type === "Dull" ? (
              <WaveSine size={22} weight="bold" color={iconColor} />
            ) : details?.type === "Resonant" ? (
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
                gap: 5,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <RgText style={{ fontSize: 16 }}>
                {/*  */}

                <Text>Classified as a {details?.type} sound</Text>
              </RgText>
              <RgText style={{ fontSize: 14, color: grayColor }}>
                {details?.name}
                {/* Audio length: 20:16 */}
              </RgText>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={togglePlayback}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
                justifyContent: "center",
              }}
            >
              {status?.isPlaying ? (
                <Pause size={20} weight="fill" color={grayColor} />
              ) : (
                <Play size={20} weight="fill" color={grayColor} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.footer]}>
        <TouchableOpacity
          onPress={() => {
            setSignals(
              signals.filter((signal) => signal?.uri !== details?.uri)
            );
            Toast.show({
              type: "error",
              topOffset: insets.top + 10,
              text1: "Audio signal deleted",
              text2: "The audio signal has been deleted from your device",
            });
            navigation.goBack();
          }}
          style={[styles.submitBtn, { backgroundColor: "#E46962" }]}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>
            Delete audio signal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SoundPreview;
