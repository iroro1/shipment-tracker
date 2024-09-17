import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";

const AppCheckbox = ({
  label,
  onChange,
  checked = false,
}: {
  label: string;
  onChange: (checked: boolean) => void;
  checked?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <TouchableOpacity style={tw`flex-row items-center`} onPress={handlePress}>
      <View
        style={[
          tw`w-[20px] h-[20px] border border-[#D0D5DD] rounded`,
          isChecked && { backgroundColor: "#2F50C1" },
        ]}
      >
        {isChecked && (
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
      </View>
      <Text style={tw`ml-2 text-[#2F50C1] text-[16px]`}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkmarkContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default AppCheckbox;
