import { useNavigation } from "@react-navigation/native";
import { Icon, Text } from "@rneui/base";
import { Card } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { heightToDp, widthToDp } from "../utils/responsive";
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
          style={styles.bottomContainer}
        >
          <Text
            style={styles.name}
          >
            {item.name}
          </Text>
               
          <View style={{ flexDirection: "row" }}>
            <Text
              style={styles.price}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomContainer: {
      backgroundColor: "black",
      height: heightToDp(6),
      padding: 5,
      borderRadius: 10,
  },
  price:{
    width: widthToDp(26),
    color: "white",
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  name:{
    color: "white",
    alignSelf: "flex-start",
    fontWeight: "bold",
  }
});

export default ProdctCard;
