import { Audio } from "expo-av";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as FileSystem from "expo-file-system";
import useColorScheme from "hooks/useColorScheme";
import { Container } from "components/_ui/custom";
import Searchbar from "components/_common/Searchbar";

import RecordBtn from "./recordBtn";
import RecordingAnimation from "./recordingAnimation";
import { useNavigation } from "@react-navigation/native";
import { useSettings } from "providers/SettingsProvider";
import { useApp } from "providers/AppProvider";

const Discover = () => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const { classifyAudioSignal } = useApp();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>("idle");
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for iOS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();

      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HighQuality
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === "recording" && recording) {
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        const res = await classifyAudioSignal(recording);
        // console.log(res);

        // Create a file name for the recording
        const fileName = `Recording-${Date.now()}.caf`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "recordings/",
          { intermediates: true }
        );
        await FileSystem.moveAsync({
          from: recordingUri || "",
          to: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
        });

        setRecording(null);
        setRecordingStatus("stopped");

        // Open modal showing the recording details
        navigation.navigate("soundDetails", {
          name: fileName,
          createdAt: new Date().getTime(),
          type: ["Dull", "Resonant", "Tympanic"][Math.floor(Math.random() * 3)],
          uri: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
        });
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  return (
    <Container paddingTop={0} style={[styles.container]}>
      <View style={[styles.searchbar]}>
        <Searchbar value={search} onFocus={() => {}} onChangeText={setSearch} />
      </View>

      <View style={[styles.content]}>
        {!recording ? (
          <RecordBtn startRecording={startRecording} />
        ) : (
          <RecordingAnimation stopRecording={stopRecording} />
        )}
      </View>
    </Container>
  );
};

export default Discover;
