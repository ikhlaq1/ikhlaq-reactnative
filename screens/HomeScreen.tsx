import { useNavigation } from '@react-navigation/native';
import { Button, FAB } from "@rneui/base";
import { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem, ScrollView, View
} from "react-native";
import ProductCard from "../components/productCard";
import apiService from "../services/api";
import Category from "../types/CategoryType";
import ProductData from "../types/ProductTypes";
import { heightToDp } from "../utils/responsive";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState<Array<ProductData>>([]);
  const [allProducts, setAllProducts] = useState<Array<ProductData>>([]);

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
        setAllProducts(response.data.products);
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
            el["isActive"] = false;
        });
        setCategory(temp);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


  const categoryFilterFunction = (categoryName:string) => {
    const inputValue = categoryName;
    if (inputValue !== "") {
      console.log(inputValue);
      const newArray = allProducts.filter((item) => {
        return item.category.match(inputValue);
      });
      console.log(newArray);
      setProducts(newArray);
    } else {
      setProducts(allProducts);
    }
  };

  const setActiveCategory = (categoryName:string) => {
    let tempCategory = [...categories]
    tempCategory.map((cat)=>{
      if(cat.name === categoryName){
        cat.isActive = true
      }
      else{
        cat.isActive = false

      }
      setCategory(tempCategory)
    })
  };
  console.log(products);
  console.log(categories);


  const renderListItems: ListRenderItem<ProductData> = ({ item }) => {
    return <ProductCard key={item._id} item={item} />;
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <ScrollView horizontal={true}>
        {categories.map((category,index) => {
          return (
            <Button
            key={index}
              onPress={()=>{
                categoryFilterFunction(category.name)
                setActiveCategory(category.name)
              }}
              buttonStyle={{ marginHorizontal: 10, borderRadius: 5 }}
              title={category.name}
              type={category.isActive ? "solid" : "outline"}
            />
          );
        })}
      </ScrollView>
      <FlatList data={products} numColumns={2} renderItem={renderListItems} />
      <FAB
      style={{margin:heightToDp(5)}}
        onPress={() => {
          navigation.navigate("Product", {
           product:null
          })
        }}
        placement="right"
        icon={{ name: 'add', color: 'black' }}
        size="small"
        color={"#fff"}
      />
    </View>
  );
};

export default HomeScreen;
