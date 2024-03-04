import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#598090",
    },
    locationText: {
      fontFamily: "second",
      color: "#598090",
      fontSize: 23,
    },
    selectedLocationText: {
      fontFamily: "second",
      color: "#bb7b85",
      fontSize: 23,
      textShadowColor: "#598090",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 5,
    },
    buttonContainer: {
      backgroundColor: "#faedcd",
      padding: 5,
      borderRadius: 10,
      margin: 5,
    },
    containerList: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    buttonContainerDel: {
      alignItems: "center",
      backgroundColor: "#faedcd",
      padding: 5,
      paddingTop: 10,
      borderRadius: 10,
      marginTop: 5,
      marginBottom: 5,
      marginRight: 10,
    },
  });

  export default styles;
