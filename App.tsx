import React, { useEffect } from 'react';
import { persistor, store } from './constants/store';

import { AppLoading } from 'expo';
import HabitioNavigator from './navigation/HabitioNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HabitioNavigator/>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App; 