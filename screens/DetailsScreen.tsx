import { useRoute } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { Image } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import apiService from "../services/api";
import ProductData from "../types/ProductTypes";
import { heightToDp, widthToDp } from "../utils/responsive";

const DetailScreen = () => {
  const route = useRoute();
  const { id }: any = route.params;
  const [currentProduct, setCurrentProduct] = useState<ProductData>();
  // const [message, setMessage] = useState<string>("");
  const getProductById = (id: string) => {
    apiService
      .getProductDetails(id)
      .then((response: any) => {
        setCurrentProduct(response.data.product);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id) getProductById(id);
  }, [id]);


  return (
    <View style={styles.container}>

      {currentProduct ? (
        <>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: currentProduct?.avatar }}
              style={{ width: widthToDp(100), height: heightToDp(40) }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomHeaderContainer}>
              <Text style={[styles.bottomHeaderText, { width: widthToDp(75) }]}>
                {currentProduct?.name}
              </Text>
              <Text style={styles.bottomHeaderText}>
                ${currentProduct?.price}
              </Text>
            </View>

            <Text style={styles.bottomDescription}>
              {currentProduct?.description}
            </Text>
          </View>
        </>
      ):
      <ActivityIndicator/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: "black",
  },
  bottomHeaderContainer: {
    flexDirection: "row",
    paddingHorizontal: widthToDp(5),
    paddingVertical: widthToDp(5),
  },
  bottomHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingBottom: heightToDp(2),
  },
  bottomDescription: {
    fontSize: 16,
    color: "white",
    paddingBottom: heightToDp(2),
    paddingHorizontal: widthToDp(4),
  },
});

export default DetailScreen;
