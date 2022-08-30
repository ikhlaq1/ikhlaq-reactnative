import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import apiService from "../services/api";
import ProductData from "../types/ProductTypes";

const DetailScreen = () => {
  const route = useRoute();
  const { id }: any = route.params;
  const [product, setCurrentProduct] = useState<ProductData>();
  // const [message, setMessage] = useState<string>("");
  const getProductById = (id: string) => {
    apiService
      .get(id)
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

  console.log(product);

  return (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
      {/* <Text style={{ fontSize: 18, paddingBottom: 12 }}>Name: {name}</Text>
      <Text style={{ fontSize: 18 }}>Birth Year: {birthYear}</Text> */}
    </View>
  );
};

export default DetailScreen;
