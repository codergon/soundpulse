import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    ...padding(14, 16, 10),
    justifyContent: "space-between",
  },
});
