import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import HomeScreen from "./HomeScreen";
import WeatherScreen from "./WeatherScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer style={styles.navigationContainer}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTintColor: styles.headerTintColor,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home Page" }}
        />
        <Stack.Screen
          name="WeatherScreen"
          component={WeatherScreen}
          options={{ title: "Weather" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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

export default AppNavigator;
