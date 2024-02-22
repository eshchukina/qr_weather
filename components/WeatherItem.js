import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "./WeatherIcon";

const WeatherItem = ({ item }) => {
  const convertToFahrenheitToCelsius = (fahrenheit) => {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  };
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>Date: {item.datetime}</Text>
      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Temperature:</Text>
        <Text style={styles.textItemData}>
          {convertToFahrenheitToCelsius(item.temp)}°C
        </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Max temperature:</Text>
        <Text style={styles.textItemData}>
          {convertToFahrenheitToCelsius(item.tempmax)}°C{" "}
        </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Mix temperature:</Text>
        <Text style={styles.textItemData}>
          {convertToFahrenheitToCelsius(item.tempmin)}°C{" "}
        </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Chance of precipitation:</Text>
        <Text style={styles.textItemData}>{item.precipprob}% </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Wind speed:</Text>
        <Text style={styles.textItemData}>{item.windspeed} mph </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Wind gust:</Text>
        <Text style={styles.textItemData}>{item.windgust} mph </Text>
      </View>

      <Text style={styles.textItem}>{item.description}</Text>
      <WeatherIcon icon={item.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#313857",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  textItem: {
    padding: 2,
    fontFamily: "first",
    fontSize: 15,
    color: "#edbabc",
  },
  textItemData: {
    padding: 2,
    fontFamily: "first",
    fontSize: 15,
    color: "#bb7b85",
  },
  textItemContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default WeatherItem;
