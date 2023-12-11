import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";
import { primaryColor } from "constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
  },

  searchbar: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    ...padding(14, 16, 10),
    justifyContent: "space-between",
  },

  // pulse animation
  animationBlock: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    padding: 2,
    width: 134,
    height: 134,
    borderWidth: 2,
    borderRadius: 200,
    borderColor: primaryColor,
  },
  innerCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
  },

  // animation text
  animationText: {
    fontSize: 24,
  },
});
