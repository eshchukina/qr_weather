import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/Ionicons";

import Close from "react-native-vector-icons/AntDesign";
import Location from "react-native-vector-icons/MaterialIcons";

function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [scannedSaveData, setScannedSaveData] = useState([]);

  const cameraRef = useRef(null);

  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleToggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    const updatedData = [...new Set([...scannedSaveData, data])]; // Используем Set для удаления дубликатов
    setScannedSaveData(updatedData);
    AsyncStorage.setItem("scannedSaveData", JSON.stringify(updatedData));
    setShowScanner(false);
    console.log(scannedSaveData);
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      const savedDataJSON = await AsyncStorage.getItem("scannedSaveData");
      if (savedDataJSON) {
        const savedDataArray = JSON.parse(savedDataJSON);
        setScannedSaveData(savedDataArray);
      }
      console.log(savedDataJSON);
    };
  
    fetchData();
  }, []);
  
  if (hasPermission === null) {
    return (
      <Text style={styles.dataText}>Requesting for camera permission</Text>
    );
  }
  if (hasPermission === false) {
    return <Text style={styles.dataText}>No access to camera</Text>;
  }

  return (
    <View style={styles.container} onPress={handleToggleScanner}>
      <Text style={styles.dataText}>
        Press the QR code image and scan the location:
      </Text>
      {showScanner ? (
        <>
          <View style={styles.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={Camera.Constants.Type.back}
              onBarCodeScanned={handleBarCodeScanned}
            />
          </View>
          {/* <TouchableOpacity title="Cancel" onPress={handleToggleScanner} style={styles.buttonContainer}>
             <Text style={styles.buttonContainerText}>    
             <Close name="close" size={30} color="#bb7b85" />

        </Text>
                </TouchableOpacity> */}
        </>
      ) : (
        <TouchableOpacity onPress={handleToggleScanner}>
          <Icon name="qr-code-outline" size={300} color="#fff1f2" />
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
          onPress={() => navigation.navigate("WeatherScreen", { scannedData })}
        >
          <Text style={styles.buttonContainerText}>Get the weather</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#598090",
    // borderRadius:300,
  },
  cameraContainer: {
    borderRadius: 20,
    overflow: "hidden", // чтобы обрезать содержимое за пределами границ контейнера
    width: 305, // задайте нужные размеры ваших окошка сканирования
    height: 305,
  },
  camera: {
    flex: 1,
  },
  dataText: {
    marginTop: 20,
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
    marginBottom:20,
    
  },
  buttonContainerText: {
    fontFamily: "second",
    color: "#bb7b85",
    fontSize: 25,
    textShadowColor: "#598090",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,

  },
});

export default HomeScreen;
