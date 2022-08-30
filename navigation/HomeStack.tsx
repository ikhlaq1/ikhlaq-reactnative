import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AddProduct from '../screens/AddProduct';
import DetailScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Upayments Store" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailScreen} />
      <HomeStack.Screen name="Product" component={AddProduct} />

    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;