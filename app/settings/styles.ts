import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "column",
  },

  // header
  header: {
    alignItems: "center",
    flexDirection: "column",
  },
  headerTitle: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitleText: {
    fontSize: 25,
    letterSpacing: 0.4,
  },

  // settings block
  settingsBlock: {
    width: "100%",
    marginTop: 26,
    flexDirection: "column",
  },
  settingsBlockTitle: {
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsBlockTitleText: {
    fontSize: 13,
    letterSpacing: 0.4,
    // textTransform: "uppercase",
  },

  // config item
  configs: {
    width: "100%",
    flexDirection: "column",
  },
  config: {
    width: "100%",
    // borderTopWidth: 1,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  configLabel: {
    gap: 14,
    alignItems: "center",
    flexDirection: "row",
  },
  configText: {
    fontSize: 15,
    letterSpacing: 0.4,
  },
});
