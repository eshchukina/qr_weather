import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Spinner = ({ source }) => {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={source}
        style={{
          width: 100,
          height: 200,
          resizeMode: "contain",
          alignItems: "center",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#598090",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Spinner;
