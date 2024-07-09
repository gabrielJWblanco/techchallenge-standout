import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const MarketView = () => {
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistoricalData = async () => {
    setLoading(true);
    const apiKey = '7FVC43LCEDY1RFU1';
    const url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${apiKey}`;
    try {
      const response = await axios.get(url);
      const data = response.data['Time Series FX (Daily)'];
      const formattedData = Object.keys(data).map(date => ({
        date,
        ...data[date],
      }));
      setHistoricalData(formattedData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Date: {item.date}</Text>
      <Text>Open: {item['1. open']}</Text>
      <Text>High: {item['2. high']}</Text>
      <Text>Low: {item['3. low']}</Text>
      <Text>Close: {item['4. close']}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text>From Currency:</Text>
        <Picker
          selectedValue={fromCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setFromCurrency(itemValue)}
        >
          <Picker.Item label="EUR" value="EUR" />
          <Picker.Item label="GBP" value="GBP" />
          <Picker.Item label="USD" value="USD" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text>To Currency:</Text>
        <Picker
          selectedValue={toCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setToCurrency(itemValue)}
        >
          <Picker.Item label="EUR" value="EUR" />
          <Picker.Item label="GBP" value="GBP" />
          <Picker.Item label="USD" value="USD" />
        </Picker>
      </View>
      <Button title="Refresh Data" onPress={fetchHistoricalData} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={historicalData}
          renderItem={renderItem}
          keyExtractor={item => item.date}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default MarketView;
