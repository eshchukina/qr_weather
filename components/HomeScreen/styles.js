import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#598090",
    },
    containerItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    cameraContainer: {
      borderRadius: 20,
      overflow: "hidden",
      width: 305,
      height: 305,
    },
    camera: {
      flex: 1,
    },
    dataText: {
      fontFamily: "first",
      color: "#faedcd",
      fontSize: 20,
      textAlign: "center",
    },
    dataTextContainer: {
      alignItems: "center",
      display: "flex",
    },
    buttonContainer: {
      backgroundColor: "#faedcd",
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonContainerHeader: {
      backgroundColor: "#313857",
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonContainerText: {
      fontFamily: "second",
      color: "#bb7b85",
      fontSize: 25,
      textShadowColor: "#598090",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 5,
    },
    qrImage: {
      textShadowColor: "#edbabc",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 5,
    },
    imageContainer: {
      paddingTop: 0,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
    },
    logoContainer:{
      width: 50,
      height: 50,
      resizeMode: "contain",
    }
  });
  
  export default styles;
  