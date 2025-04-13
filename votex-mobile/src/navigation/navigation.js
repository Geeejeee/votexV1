// src/navigation/Navigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../screens/register.jsx";
import LoginScreen from "../screens/login.jsx";
import HomeScreen from "../screens/homescreen.jsx";
import VoteNowScreen from "../screens/VoteNowScreen.jsx";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VoteNow" component={VoteNowScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
