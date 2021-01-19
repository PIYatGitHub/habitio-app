import React, { Fragment } from 'react';

import HabitioNavigator from './navigation/HabitioNavigator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <Fragment>
       <HabitioNavigator/>
        <StatusBar style="light" />
    </Fragment>
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
