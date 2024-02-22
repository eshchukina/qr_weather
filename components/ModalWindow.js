import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "react-native-vector-icons/SimpleLineIcons";

const ModalWindow = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>
            {" "}
            <Map name="map" size={40} color="#bb7b85" />
          </Text>
          <View style={styles.textDescriptionContainer}>
            <Text style={styles.textDescription}>
              QRWeather is a versatile mobile application designed to simplify
              your travel experiences.
            </Text>

            <Text style={styles.textDescription}>
              With our intuitive QR scanner feature, effortlessly scan the QR
              codes of various locations to retrieve instant weather updates.
            </Text>

            <Text style={styles.textDescription}>
              With our intuitive QR scanner feature, effortlessly scan the QR
              codes of various locations to retrieve instant weather updates.
            </Text>

            <Text style={styles.textDescription}>
              QR Location Scanner: Scan QR codes of different locations to
              obtain real-time weather forecasts.
            </Text>
            <Text style={styles.textDescription}>
              Weather Updates: Receive comprehensive weather information,
              including temperature, wind speed, and more, for scanned
              locations.
            </Text>
            <Text style={styles.textDescription}>
              Saved Locations: Keep track of your scanned locations with our
              convenient tab system. Save up to 10 scanned locations for easy
              reference and future planning.
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={40} color="#bb7b85" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#edbabc",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  textDescriptionContainer: {
    justifyContent: "space-around",
  },
  textDescription: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "first",
    padding: 5,
    color: "#313857",
  },
});

export default ModalWindow;
