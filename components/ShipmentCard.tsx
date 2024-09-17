import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const ShipmentCard = ({
  data,
}: {
  data: { id: number; name: string; status: string };
}) => {
  return (
    <View style={tw`p-4 border-b border-gray-200`}>
      <Text style={tw`text-lg`}>{data.name}</Text>
      <Text>Status: {data.status}</Text>
    </View>
  );
};

export default ShipmentCard;
