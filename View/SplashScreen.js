import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import img from "../assets/LogoMarket.png"
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 1500); // 1.5 segundos de espera
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image  source={img} style={styles.image} />
      <Text style={styles.title}>Market Inc.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#adaca3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default SplashScreen