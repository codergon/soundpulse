import { styles } from "./styles";
import {
  Linking,
  Platform,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { RgText, Text } from "components/_ui/typography";
import { Container } from "components/_ui/custom";
import Br from "components/_common/Br";
import {
  Moon,
  Play,
  Vibrate,
  FileText,
  Question,
  CaretRight,
  Microphone,
  TwitterLogo,
} from "phosphor-react-native";
import useColorScheme from "hooks/useColorScheme";
import { ISettings, useSettings } from "providers/SettingsProvider";

// import { MenuView } from "@react-native-menu/menu";

const SettingsBlockHeader = ({ title = "", color = "#8F8E93" }) => {
  return (
    <View style={[styles.settingsBlockTitle]}>
      <RgText style={[styles.settingsBlockTitleText, { color }]}>
        {title}
      </RgText>
    </View>
  );
};

const Settings = () => {
  const isEnabled = true;
  const isDarkMode = useColorScheme() === "dark";
  const iconColor = isDarkMode ? "#fff" : "#000";
  const grayColor = isDarkMode ? "#8F8E93" : "#555";

  const { settings, updateSettings } = useSettings();

  return (
    <Container paddingTop={20} style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.headerTitle]}>
          <Text style={[styles.headerTitleText]}>Settings</Text>
        </View>
      </View>

      <View style={[styles.settingsBlock]}>
        <SettingsBlockHeader color={grayColor} title="App Preferences" />

        <View style={[styles.configs]}>
          <View
            style={[
              styles.config,
              {
                borderColor: "#333",
              },
            ]}
          >
            <View style={[styles.configLabel]}>
              <Moon size={18} weight="regular" color={iconColor} />
              <RgText style={[styles.configText]}>Theme</RgText>
            </View>

            <CaretRight size={20} weight="bold" color="#8F8E93" />
          </View>

          {[
            {
              type: "switch",
              label: "haptics",
              title: "Haptic Feedback",
              onValueChange: () => {},
              icon: <Vibrate size={18} weight="regular" color={iconColor} />,
            },
            {
              type: "switch",
              label: "autoplay",
              title: "Autoplay recordings",
              onValueChange: () => {},
              icon: <Play size={18} weight="regular" color={iconColor} />,
            },
            {
              type: "switch",
              label: "autostart",
              title: "Start recording on launch",
              icon: <Microphone size={18} weight="regular" color={iconColor} />,
              onValueChange: () => {},
            },
          ].map((item: any, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.config,
                  {
                    borderColor: "#333",
                  },
                ]}
              >
                <View style={[styles.configLabel]}>
                  {item?.icon && item?.icon}
                  <RgText style={[styles.configText]}>{item.title}</RgText>
                </View>

                <Switch
                  value={settings[item?.label as keyof ISettings] === "on"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    updateSettings(
                      item?.label,
                      settings[item?.label as keyof ISettings] === "on"
                        ? "off"
                        : "on"
                    );
                  }}
                  trackColor={{ false: "#3e3e3e", true: "#a38cff" }}
                />
              </View>
            );
          })}
        </View>
      </View>

      <View style={[styles.settingsBlock]}>
        <SettingsBlockHeader color={grayColor} title="Support" />

        <View style={[styles.configs]}>
          {[
            {
              label: "about",
              title: "About",
              link: "https://github.com/codergon/soundpulse",
              icon: <FileText size={18} weight="regular" color={iconColor} />,
            },
            {
              label: "help",
              title: "Help",
              link: "https://github.com/codergon/soundpulse/issues",
              icon: <Question size={18} weight="regular" color={iconColor} />,
            },
            {
              label: "twitter",
              title: "Twitter",
              link: "https://twitter.com/thealpha_knight",
              icon: <TwitterLogo size={18} weight="fill" color={"#1DA1F2"} />,
            },
            // {
            //   type: "social",
            //   label: "rating",
            //   title: "Rate us",
            //   icon: <Heart size={18} weight="fill" color={"#FF3728"} />,
            // },
          ].map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(item?.link);
                }}
                key={index}
                style={[
                  styles.config,
                  {
                    borderColor: "#333",
                  },
                ]}
              >
                <View style={[styles.configLabel]}>
                  {item?.icon && item?.icon}
                  <RgText style={[styles.configText]}>{item.title}</RgText>
                </View>
                <CaretRight size={20} weight="bold" color="#8F8E93" />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Container>
  );
};

export default Settings;
