import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Pressable,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "react-native-elements";
import { Grid, LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import img from "../assets/LogoMarket.png"
import { YAxis } from "react-native-svg-charts";
import { XAxis } from "react-native-svg-charts";

const MarketView = () => {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const rotateValue = useRef(new Animated.Value(0)).current;

  const fetchHistoricalData = async () => {
    setLoading(true);
    const apiKey = "7FVC43LCEDY1RFU1";
    const demoKey = "demo";
    const url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${demoKey}`;
    try {
      const response = await axios.get(url);
      const data = response.data["Time Series FX (Daily)"];
      const formattedData = Object.keys(data).map((date) => ({
        date,
        ...data[date],
      }));
      setHistoricalData(formattedData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  const openValues = historicalData.map((item) => parseFloat(item["1. open"]));
  const dates = historicalData.map((item) => {
    const date = new Date(item.date);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero
    const year = date.getFullYear();
    return `${month}-${year}`;
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Date: {item.date}</Text>
      <View style={styles.item}>
        <Text style={styles.itemText}>Open: {item["1. open"]}</Text>
        <Text style={styles.itemText}>High: {item["2. high"]}</Text>
        <Text style={styles.itemText}>Low: {item["3. low"]}</Text>
        <Text style={styles.itemText}>Close: {item["4. close"]}</Text>
      </View>
    </View>
  );

  const startRotation = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => fetchHistoricalData());
  };

  const rotateAnimation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickersContainer}>
        <View style={styles.pickerBox}>
          <Text style={{ color: "#fff" }}>From:</Text>
          <Picker
            dropdownIconColor={"#fff"}
            selectedValue={fromCurrency}
            style={styles.picker}
            onValueChange={(itemValue) => setFromCurrency(itemValue)}
          >
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="USD" value="USD" />
          </Picker>
        </View>
        <View style={styles.pickerBox}>
          <Text style={{ color: "#fff" }}>To:</Text>
          <Picker
            dropdownIconColor={"#fff"}
            selectedValue={toCurrency}
            style={styles.picker}
            onValueChange={(itemValue) => setToCurrency(itemValue)}
          >
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="USD" value="USD" />
          </Picker>
        </View>
        <Pressable onPress={startRotation}>
          <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
            <Icon name="autorenew" color="white" />
          </Animated.View>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0f1f30" />
      ) : (
        <>
          <View style={{ height: 200, flexDirection: 'row' }}>
            <YAxis
              data={openValues}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fontSize: 10, fill: 'grey' }}
              numberOfTicks={6}
              formatLabel={(value) => `${value}`}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                style={{ flex: 1 }}
                data={openValues}
                svg={{ stroke: '#0f1f30' }}
                contentInset={{ top: 20, bottom: 20 }}
                curve={shape.curveNatural}
              >
                <Grid />
              </LineChart>
            </View>
          </View>

          <FlatList
            data={historicalData}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item) => item.date}
            style={{ height: 200, flexGrow: 0, marginTop:50 }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#adaca3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  pickerBox: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: 150,
    color: "#fff",
    marginRight: 20,
  },
  item: {
    backgroundColor: "#0f1f30",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: Dimensions.get("window").width - 100,
    borderRadius: 10,
  },
  itemContainer: {},
  itemText: {
    color: "#fff",
  },
  pickersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0f1f30",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: 100,
    height: 100,


  },
});

export default MarketView;
