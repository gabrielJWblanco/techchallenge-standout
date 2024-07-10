# techchallenge-standout
# Stock Market App

## Overview

The Stock Market App is a React Native application designed to provide users with historical stock market data. The app allows users to select different currency pairs and view their historical exchange rates. It also includes a refreshing feature to update the data.

### Features

- View historical exchange rates for selected currency pairs
- Refresh data with a single click
- User-friendly navigation

## Screens

1. **Splash Screen**: The initial loading screen displayed when the app starts.
2. **Market View**: The main screen where users can view historical exchange rates for selected currency pairs.

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js
- Yarn
- React Native CLI
- Android Studio (for Android development)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/stock-market-app.git
    cd stock-market-app
    ```

2. **Install dependencies**:

    ```bash
    yarn install
    ```

### Running on Android

1. **Start the Metro Bundler**:

    ```bash
    yarn start
    ```

2. **Open Android Studio**:
   - Open the `android` folder inside the project directory with Android Studio.
   - Make sure you have an Android Virtual Device (AVD) set up.

3. **Run the app**:

    ```bash
    yarn android
    ```

### Running Tests

To run the tests for the app:

```bash
yarn test
```