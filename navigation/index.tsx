import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import HomeStackNavigator from './HomeStack';


const RootNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;