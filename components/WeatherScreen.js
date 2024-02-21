import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WeatherItem from "./WeatherItem";

const WeatherScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
    }
  }, [selectedLocation]);

  const fetchSavedLocations = async () => {
    try {
      const savedLocationsJSON = await AsyncStorage.getItem("scannedSaveData");
      if (savedLocationsJSON) {
        const locations = JSON.parse(savedLocationsJSON);
        setSavedLocations(locations);
        if (locations.length > 0) {
          setSelectedLocation(locations[0]);
        }
      } else {
        // Если данных нет, устанавливаем "Moscow,Ru" по умолчанию
        setSavedLocations(["Moscow,Ru"]);
        setSelectedLocation("Moscow,Ru");
      }
    } catch (error) {
      console.error("Error fetching saved locations:", error);
    }
  };
  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=U9A8E5E5BQ3ZZZCL32MLDUKPR`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
  };

  if (!weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("../assets/qr_spinner.gif")}
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

  const { days } = weatherData;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={savedLocations}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationPress(item)}>
            <Text style={selectedLocation === item ? styles.selectedLocationText : styles.locationText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.datetime + index.toString()} // Объединяем datetime и индекс
        />

      <FlatList
        data={days}
        renderItem={({ item }) => <WeatherItem item={item} />}
        keyExtractor={(item) => item.datetime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#598090",
    padding: 10,
  },
  locationText: {
    fontFamily: "first",
    color: "#faedcd",
    fontSize: 20,
    marginRight: 10,
  },
  selectedLocationText: {
    fontFamily: "first",
    color: "#faedcd",
    fontSize: 20,
    marginRight: 10,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#598090",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WeatherScreen;
