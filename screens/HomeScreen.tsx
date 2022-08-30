import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductCard from "../components/productCard";
import apiService from "../services/api";
import Category from "../types/CategoryType";
import ProductData from "../types/ProductTypes";

const HomeScreen = () => {
  const [products, setProducts] = useState<Array<ProductData>>([]);
  const [categories, setCategory] = useState<Array<Category>>([]);

  useEffect(() => {
    retriveProducts();
    getCategories();
  }, []);

  const retriveProducts = () => {
    apiService
      .getAll()
      .then((response: any) => {
        setProducts(response.data.products);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getCategories = () => {
    apiService
      .getCategories()
      .then((response: any) => {
        let temp = response.data.categories;
        temp.map((el: Category, index: number) => {
          if (index === 0) {
            el["isActive"] = true;
          } else {
            el["isActive"] = false;
          }
        });
        setCategory(temp);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  console.log(categories);

  const renderListItems: ListRenderItem<ProductData> = ({ item }) => {
    return <ProductCard item={item} />;
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <ScrollView horizontal={true}>
        {categories.map((category) => {
          return (
            <Button
              buttonStyle={{ marginHorizontal: 10, borderRadius: 5 }}
              title={category.name}
              type={category.isActive ? "solid" : "outline"}
            />
          );
        })}
      </ScrollView>
      <FlatList data={products} numColumns={2} renderItem={renderListItems} />
    </View>
  );
};

export default HomeScreen;
