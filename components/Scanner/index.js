import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

import styles from "../HomeScreen/styles";

function Scanner({ onBarCodeScanned }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
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
    <View style={styles.cameraContainer}>
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={onBarCodeScanned}
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      />
    </View>
  );
}

export default Scanner;
