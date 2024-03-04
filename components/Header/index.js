import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import ModalWindow from "../ModalWindow";
import Map from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";

function Header({ scannedData }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
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
    </>
  );
}

export default Header;
