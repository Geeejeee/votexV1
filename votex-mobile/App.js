import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/navigation";
import { UserProvider } from "./src/context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </UserProvider>
  );
}
