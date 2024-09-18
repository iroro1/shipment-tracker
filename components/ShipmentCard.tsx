import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import AppCheckbox from "./AppCheckbox";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { toggleSelectShipment } from "../redux/slices/shipmentSlice";
import { getShipmentsStatusFn } from "../services/authService";

const ShipmentCard = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState();

  const loadStatusData = async () => {
    try {
      const response: any = await getShipmentsStatusFn();
      console.log(response.response.message, "fil");

      if (response.status === 200) {
        // const stat = response.response.message.filter(
        //   (itm: any) => itm.name === data.status
        // );
        // console.log(stat, 222);
        // setStatus(stat);
      }
    } catch (error) {}
  };
  useEffect(() => {
    loadStatusData();
  }, []);

  // console.log(status, 2);

  return (
    <View
      style={tw`min-h-[67px] w-full rounded-[8px] border border-[${
        data?.selected && !isExpanded ? "#2F50C1" : "#D0D5DD"
      }]  mb-[8px] bg-[#F4F2F8] overflow-hidden`}
    >
      <View style={tw`flex-row p-[12px] items-center`}>
        <View style={tw`flex-row items-center`}>
          <AppCheckbox
            bg="white"
            otherStyles={{
              backgroundColor: data?.selected ? "#2F50C120" : "white",
              borderWidth: data?.selected ? 1 : 0,
              borderColor: data?.selected ? "#2F50C180" : "#D0D5DD",
            }}
            checkStyles={{
              borderColor: data?.selected ? "#2F50C1" : "#D0D5DD",
              color: data?.selected ? "#2F50C190" : "#D0D5DD",
            }}
            checked={data?.selected}
            onChange={() => {
              dispatch(toggleSelectShipment(data?.id));
            }}
            useDefault={true}
          />
          <Image
            resizeMode="contain"
            style={tw`w-[40px] h-[40px]`}
            source={require("../assets/images/box1.png")}
          />
          <View style={tw`ml-[7px]`}>
            <Text style={tw`text-[13px] text-[#3F395C]`}>{"AWB"}</Text>
            <Text style={tw`text-[18px] text-[#000] font-bold`}>
              {data.barcode}
            </Text>
            <View style={tw`flex-row items-center gap-[8px]`}>
              <Text style={tw`text-[11px] text-[#757281]`}>
                {data.origin_city}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#2F50C1" />
              <Text style={tw`text-[11px] text-[#757281]`}>
                {data.destination_city}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`ml-auto flex-row items-center gap-1`}>
          <View
            style={tw`flex-row items-center gap-1 h-[23px] border border-[#D0D5DD] rounded-[4px] p-1`}
          >
            <Text style={tw`text-[10px]`}>{data.status}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
            style={[
              tw`h-[30px] w-[30px] ${
                isExpanded
                  ? "bg-[#2F50C1]/70 border-[4px] border-white"
                  : "bg-white"
              } flex-row-reverse rounded-full items-center justify-center `,
              {
                transform: [{ rotate: "140deg" }],
              },
            ]}
          >
            <Ionicons
              name="arrow-forward"
              size={10}
              color={isExpanded ? "white" : "#2F50C1"}
            />
            <Ionicons
              name="arrow-back"
              size={10}
              color={isExpanded ? "white" : "#2F50C1"}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isExpanded && (
        <View
          style={[
            tw` p-[12px] z-10  rounded-b-[8px]  border-[#2F50C1] bg-[#fff]`,
            {
              borderStyle: "dashed",
              borderColor: "#2F50C1",
              borderWidth: data?.selected ? 1 : 0,
            },
          ]}
        >
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <Text style={tw`text-[11px] text-[#2F50C1]`}>Origin</Text>
              <Text style={tw`text-[13px] text-[#333]`}>
                {data.origin_country}
              </Text>
              <Text style={tw`text-[13px] text-[#757281]`}>
                {data.origin_city}, {data.origin_zone}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#2F50C1" />
            <View>
              <Text style={tw`text-[11px] text-[#2F50C1]`}>Destination</Text>
              <Text style={tw`text-[13px] text-[#333]`}>
                {data.destination_country}
              </Text>
              <Text style={tw`text-[13px] text-[#757281]`}>
                {data.destination_city}, {data.destination_zone}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-end mt-[12px] gap-4`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-center gap-2 bg-[#2F50C1]/80 w-[100px] h-[40px] rounded-[8px]`}
            >
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={tw`text-[17px] text-[#fff]`}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center justify-center gap-2 bg-green-500 w-[150px] h-[40px] rounded-[8px]`}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/images/Whatsapp.png")}
              />
              <Text style={tw`text-[17px] text-[#fff]`}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ShipmentCard;
