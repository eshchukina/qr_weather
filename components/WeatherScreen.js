import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WeatherItem from "./WeatherItem";
import Arrow from "react-native-vector-icons/Ionicons";
import Del from "react-native-vector-icons/Feather";
import Spinner from "./Spinner";

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
    }
  }, [selectedLocation]);

  const removeWord = async (location) => {
    try {
      const updatedWords = savedLocations.filter((item) => item !== location);
      setSavedLocations(updatedWords);
      await AsyncStorage.setItem(
        "scannedSaveData",
        JSON.stringify(updatedWords)
      );
    } catch (error) {
      console.error("Error removing word:", error);
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
  const handleNoSavedLocations = async () => {
    try {
      const defaultLocation = "Moscow,Ru";
      await fetchWeatherData(defaultLocation);
      setSelectedLocation(defaultLocation);
    } catch (error) {
      console.error("Error handling no saved locations:", error);
    }
  };

  const fetchSavedLocations = async () => {
    try {
      const savedLocationsJSON = await AsyncStorage.getItem("scannedSaveData");
      if (savedLocationsJSON) {
        const locations = JSON.parse(savedLocationsJSON);
        setSavedLocations(locations);
        if (locations.length > 0) {
          setSelectedLocation(locations[0]);
          fetchWeatherData(locations[0]);
        } else {
          handleNoSavedLocations();
        }
      } else {
        handleNoSavedLocations();
      }
    } catch (error) {
      console.error("Error fetching saved locations:", error);
    }
  };
  const handleLocationPress = (location) => {
    setWeatherData(null);
    setSelectedLocation(null);
    setWeatherDataLoading(true);
    fetchWeatherData(location)
      .then(() => {
        setSelectedLocation(location);
        setWeatherDataLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherDataLoading(false);
      });
  };

  if (weatherDataLoading || !weatherData) {
    return <Spinner source={require("../assets/qr_spinner.gif")} />;
  }

  const { days } = weatherData;

  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        {savedLocations.length > 2 && (
          <Text>
            <Arrow name="arrow-back" size={20} color="#faedcd" />
          </Text>
        )}

        <FlatList
          style={styles.listButton}
          horizontal
          data={savedLocations.length > 0 ? savedLocations : ["Moscow,Ru"]}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() => handleLocationPress(item)}
                style={styles.buttonContainer}
              >
                <Text
                  style={
                    selectedLocation === item
                      ? styles.selectedLocationText
                      : styles.locationText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>

              {savedLocations.length > 0 && (
                <TouchableOpacity
                  onPress={() => removeWord(item)}
                  style={styles.buttonContainerDel}
                >
                  <Text>
                    <Del name="delete" size={20} color="#313857" />
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          keyExtractor={( index ) => index.toString()}
        />
        {savedLocations.length > 2 && (
          <Text>
            <Arrow name="arrow-forward" size={20} color="#faedcd" />
          </Text>
        )}
      </View>

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

export default WeatherScreen;
