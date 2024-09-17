// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShipmentListScreen from "../screens/ShipmentListScreen";
// import AnotherScreen from "../screens/AnotherScreen";
// import NotificationScreen from "../screens/NotificationScreen";
// import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "ShipmentList") {
            iconName = "cube";
          } else if (route.name === "Scan") {
            iconName = "barcode";
          } else if (route.name === "Wallet") {
            iconName = "wallet";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4561DB",
        tabBarInactiveTintColor: "#A7A3B3",
        tabBarAllowFontScaling: false,
        tabBarItemStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 50,
        },
      })}
    >
      <Tab.Screen name="ShipmentList" component={ShipmentListScreen} />
      <Tab.Screen name="Scan" component={ShipmentListScreen} />
      <Tab.Screen name="Wallet" component={ShipmentListScreen} />
      <Tab.Screen name="Profile" component={ShipmentListScreen} />
    </Tab.Navigator>
  );
}
