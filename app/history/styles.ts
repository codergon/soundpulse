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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerBtns: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitleText: {
    fontSize: 25,
    letterSpacing: 0.4,
  },
  headerBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar__cover: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  // content
  content: {
    flex: 1,
    paddingVertical: 20,
    flexDirection: "column",
  },
});
