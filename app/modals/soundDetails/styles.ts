import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    gap: 16,
    width: "100%",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    ...padding(16, 18, 14),
    justifyContent: "space-between",
  },

  content: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "column",
  },

  footer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 18,
    flexDirection: "column",
  },

  // Submit Button
  submitBtn: {
    height: 48,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
