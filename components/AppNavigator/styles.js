import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: "#fff1f2",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitleStyle: {
    fontFamily: "second",
    fontSize: 30,
    textShadowColor: "#598090",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  headerTintColor: "#bb7b85",
});

export default styles;
