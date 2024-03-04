import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#edbabc",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  textDescriptionContainer: {
    justifyContent: "space-around",
  },
  textDescription: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "first",
    padding: 5,
    color: "#313857",
  },
});

export default styles;
