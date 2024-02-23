import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import ModalWindow from "./ModalWindow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from 'expo-barcode-scanner';

import Icon from "react-native-vector-icons/Ionicons";
import Map from "react-native-vector-icons/MaterialCommunityIcons";
import Close from "react-native-vector-icons/AntDesign";
import Location from "react-native-vector-icons/MaterialIcons";

function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [scannedSaveData, setScannedSaveData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const savedDataJSON = await AsyncStorage.getItem("scannedSaveData");
      if (savedDataJSON) {
        const savedDataArray = JSON.parse(savedDataJSON);
        setScannedSaveData(savedDataArray);
      }
      //   console.log(savedDataJSON);
    };

    fetchData();
  }, []);

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

  if (hasPermission === null) {
    return (
      <Text style={styles.dataText}>Requesting for camera permission</Text>
    );
  }

  if (hasPermission === false) {
    return <Text style={styles.dataText}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/qr_logoText.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
          }}
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
            <Camera
  barCodeScannerSettings={{
    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
  }}
  onBarCodeScanned={handleBarCodeScanned} // Используйте правильное имя функции
  ref={cameraRef}
  style={styles.camera}
  type={Camera.Constants.Type.back}
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
});

export default HomeScreen;
