import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App'; // adjust the path if necessary

// Mock components to render identifiable text
jest.mock('../View/SplashScreen', () => {
  const React = require('react');
  const { useEffect } = React;
  const { Text } = require('react-native');
  const { useNavigation } = require('@react-navigation/native');
  
  return () => {
    const navigation = useNavigation();
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
      return () => clearTimeout(timer);
    }, [navigation]);
    
    return <Text>SplashScreen Component</Text>;
  };
});

jest.mock('../View/MarketView', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>MarketView Component</Text>;
});

describe('App Navigation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders SplashScreen initially and navigates to MarketView', async () => {
    const { getByText, findByText } = render(<App />);

    // Verify SplashScreen is displayed initially
    expect(getByText('SplashScreen Component')).toBeTruthy();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Wait for MarketView to be displayed
    await waitFor(() => {
      expect(getByText('MarketView Component')).toBeTruthy();
    });
  });
});
