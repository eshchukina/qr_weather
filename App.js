import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./components/AppNavigator";
import * as Font from "expo-font";
import Spinner from "./components/Spinner";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          first: require("./assets/fonts/Sarabun-Regular.ttf"),
          second: require("./assets/fonts/Satisfy-Regular.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Spinner source={require("./assets/images/qr_spinner.gif")} />;
  }
  return (
    <View style={styles.container}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#598090",
  },
});
