import React from "react";
import { View, Image } from "react-native";

import styles from "./styles";

const Spinner = ({ source }) => {
  return (
    <View style={styles.loadingContainer}>
      <Image source={source} style={styles.spinnerImage} />
    </View>
  );
};

export default Spinner;
