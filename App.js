import React, { useState, useEffect } from "react";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import AppNavigator from './components/AppNavigator';
import * as Font from "expo-font";


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
  async function loadFonts() {
    try {
      await Font.loadAsync({
        first: require("./assets/Sarabun-Regular.ttf"),
        second: require("./assets/Satisfy-Regular.ttf"),
      
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  }

  loadFonts();
}, []);



if (!fontsLoaded) {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require("./assets/qr_spinner.gif")}
        style={{
          width: 100,
          height: 200,
          resizeMode: "contain",
          alignItems: "center",
        }}
      />
    </View>
  );
}
  return (
    <View style={styles.container}>
      <AppNavigator/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#598090', 

  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#598090",
    alignItems: "center",
    justifyContent: "center",
  },
});
