import React from "react";
import { StyleSheet, View } from "react-native";
import tw from "twrnc";

const DashedLines = ({
  dashGap,
  dashLength,
  color,
}: {
  dashLength: number;
  color: string;
  dashGap: number;
}) => {
  // function to generate an array from len param
  const generateArray = (len: number) => {
    return Array.from({ length: len });
  };

  return (
    <View
      style={tw`flex-row min-w-full gap-[${dashGap}px] justify-between absolute`}
    >
      {generateArray(dashLength).map((dash: any) => (
        <View key={dash} style={tw`h-[1px] w-3 bg-[${color}]`} />
      ))}
    </View>
  );
};

export default DashedLines;

const styles = StyleSheet.create({});
