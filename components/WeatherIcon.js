import React from "react";
import { View , StyleSheet} from "react-native";
import Snow from "react-native-vector-icons/FontAwesome";
import Thunder from "react-native-vector-icons/Ionicons";
import Rain from "react-native-vector-icons/Ionicons";
import Fog from "react-native-vector-icons/Fontisto";
import Wind from "react-native-vector-icons/FontAwesome5";
import Cloud from "react-native-vector-icons/Ionicons";
import Sun from "react-native-vector-icons/Ionicons";

const WeatherIcon = ({ icon }) => {
  let iconComponent = null;

  switch (icon) {
    case "snow":
    case "snow-showers-day":
    case "snow-showers-night":
      iconComponent = <Snow name="snowflake-o" size={40} color="#fff1f2" />;
      break;
    case "thunder-rain":
    case "thunder-showers-day":
    case "thunder-showers-night":
      iconComponent = <Thunder name="thunderstorm-sharp" size={40} color="#bb7b85" />;
      break;
    case "rain":
    case "showers-day":
    case "showers-night":
      iconComponent = <Rain name="rainy" size={40} color="#598090" />;
      break;
    case "fog":
      iconComponent = <Fog name="fog" size={40} color="#edbabc" />;
      break;
    case "wind":
      iconComponent = <Wind name="wind" size={40} color="#edbabc" />;
      break;
    case "cloudy":
    case "partly-cloudy-day":
    case "partly-cloudy-night":
      iconComponent = <Cloud name="cloud" size={40} color="#598090" />;
      break;
    case "clear-day":
    case "clear-night":
      iconComponent = <Sun name="sunny-outline" size={40} color="#faedcd" />;
      break;
    default:
      iconComponent = null;
  }

  return <View style={styles.iconContainer}>{iconComponent}</View>;
};
const styles = StyleSheet.create({
    iconContainer: {
        marginTop: 10,
      },
  });
export default WeatherIcon;
