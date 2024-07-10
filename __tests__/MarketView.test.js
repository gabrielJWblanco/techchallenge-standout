import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MarketView from '../View/MarketView'; 

// Mock axios
const mock = new MockAdapter(axios);

const mockData = {
  "Time Series FX (Daily)": {
    "2024-07-10": {
      "1. open": "1.08141",
      "2. high": "1.08290",
      "3. low": "1.08105",
      "4. close": "1.08262"
    },
    "2024-07-09": {
      "1. open": "1.08178",
      "2. high": "1.08202",
      "3. low": "1.08167",
      "4. close": "1.08167"
    }
  }
};

test('renders MarketView and fetches data correctly', async () => {
  mock.onGet(/alphavantage.co/).reply(200, mockData);

  const { getByText, getByTestId } = render(<MarketView />);
  
  // Check if initial elements are rendered
  expect(getByText('From:')).toBeTruthy();
  expect(getByText('To:')).toBeTruthy();

  // Wait for the data to be fetched and rendered
  await waitFor(() => {
    expect(getByText('Date: 2024-07-10')).toBeTruthy();
    expect(getByText('Open: 1.08141')).toBeTruthy();
    expect(getByText('High: 1.08290')).toBeTruthy();
    expect(getByText('Low: 1.08105')).toBeTruthy();
    expect(getByText('Close: 1.08262')).toBeTruthy();
  });

  // Simulate pressing the refresh button
  const refreshButton = getByTestId('refresh-button');
  fireEvent.press(refreshButton);

  // Wait for the data to be re-fetched and rendered
  await waitFor(() => {
    expect(getByText('Date: 2024-07-09')).toBeTruthy();
    expect(getByText('Open: 1.08178')).toBeTruthy();
    expect(getByText('High: 1.08202')).toBeTruthy();
    expect(getByText('Low: 1.08167')).toBeTruthy();
    expect(getByText('Close: 1.08167')).toBeTruthy();
  });
});
