import { useNavigation } from "@react-navigation/native";
import { Icon, Text } from "@rneui/base";
import { Card } from "@rneui/themed";
import React from "react";
import { Pressable, View } from "react-native";
const ProdctCard = ({ item }: any) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Details", {
          id: item._id,
        })
      }
      style={{ flex: 1, margin: 0 }}
    >
      <Card>
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri: item.avatar,
          }}
        />

        <View
          style={{
            backgroundColor: "black",
            height: 40,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "flex-start",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "80%",
                color: "white",
                alignSelf: "flex-start",
                fontWeight: "bold",
              }}
            >
              $ {item.price}
            </Text>
            <Pressable onPress={() => {
                 navigation.navigate("Product", {
                  product :item
                 })
            }}>
              <Icon iconStyle={{ fontSize: 15 }} color={"#fff"} name="edit" />
            </Pressable>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default ProdctCard;
