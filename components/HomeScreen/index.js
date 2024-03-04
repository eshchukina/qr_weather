import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ModalWindow from "../ModalWindow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Scanner from "../Scanner";
import Icon from "react-native-vector-icons/Ionicons";
import Map from "react-native-vector-icons/MaterialCommunityIcons";
import Close from "react-native-vector-icons/AntDesign";
import Location from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

function HomeScreen({ navigation }) {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [scannedSaveData, setScannedSaveData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const savedDataJSON = await AsyncStorage.getItem("scannedSaveData");
      if (savedDataJSON) {
        const savedDataArray = JSON.parse(savedDataJSON);
        setScannedSaveData(savedDataArray);
      }
    };
    fetchData();
  }, []);

 const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleToggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScannedData(data);
    let updatedData = [...new Set([...scannedSaveData, data])];
    updatedData = updatedData.slice(-10);
    setScannedSaveData(updatedData);
    await AsyncStorage.setItem("scannedSaveData", JSON.stringify(updatedData));
    setShowScanner(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/qr_logoText.png")}
          style={styles.logoContainer}
        />
        <TouchableOpacity
          style={styles.buttonContainerHeader}
          onPress={handleToggleModal}
        >
          <Map name="text" size={40} color="#faedcd" />
        </TouchableOpacity>

        <ModalWindow
          visible={modalVisible}
          scannedData={scannedData}
          onClose={handleToggleModal}
        />
      </View>
      <View style={styles.containerItem}>
        <Text style={styles.dataText}>
          Press the QR code image and scan the location:
        </Text>
        {showScanner ? (
          <>
            <View style={styles.cameraContainer}>
              <Scanner
                    onBarCodeScanned={handleBarCodeScanned} 
              />
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={handleToggleScanner}>
            <Text style={styles.qrImage}>
              <Icon name="qr-code-outline" size={300} color="#fff1f2" />
            </Text>
          </TouchableOpacity>
        )}
        {scannedData !== "" && (
          <View style={styles.dataTextContainer}>
            <Text style={styles.dataText}>
              Location: {scannedData}
              <Location name="location-on" size={30} color="#edbabc" />
            </Text>
          </View>
        )}

        {showScanner ? (
          <>
            <TouchableOpacity
              title="Cancel"
              onPress={handleToggleScanner}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonContainerText}>
                <Close name="close" size={30} color="#bb7b85" />
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              navigation.navigate("WeatherScreen", { scannedData })
            }
          >
            <Text style={styles.buttonContainerText}>Get the weather</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default HomeScreen;
