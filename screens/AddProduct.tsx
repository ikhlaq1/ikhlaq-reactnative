import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Text } from "@rneui/base";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, View } from "react-native";
import apiService from "../services/api";
import Category from "../types/CategoryType";
import { heightToDp, widthToDp } from "../utils/responsive";

const AddProduct = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product }: any = route.params;
  const [categories, setCategory] = useState<Array<Category>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(product?.category ? product.category:'');
  const [laoding, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCategories();
  }, []);

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

  const setActiveCategory = (categoryName: string) => {
    let tempCategory = [...categories];
    tempCategory.map((cat) => {
      if (cat.name === categoryName) {
        cat.isActive = true;
        setSelectedCategory(categoryName);
      } else {
        cat.isActive = false;
      }
      setCategory(tempCategory);
    });
  };

  const addProduct = (data: any) => {
    setLoading(true)
    let finalData = data;
    finalData["developerEmail"] = "ikhlaq201@gmail.com";
    finalData["category"] = selectedCategory;
    apiService
      .addProduct(finalData)
      .then((response: any) => {
        if(response.data.message == 'Success'){
          Alert.alert(
            "Success",
            "Product Added Successfully",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => navigation.goBack() }
            ]
          );
        }
        setLoading(false)
      })
      .catch((e: Error) => {
        setLoading(false)
        console.log(e);
      });
  };

  return (
    <Formik
      initialValues={{
        name: product?.name ? product.name : "",
        price: product?.price ? product.price.toString() : "",
        description: product?.description ? product.description : "",
        avatar: product?.avatar ? product.avatar : "",
      }}
      onSubmit={(values) => {
        addProduct(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Product title"
            value={values.name}
            onChangeText={handleChange("name")}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Price"
            keyboardType='numeric'
            value={values.price}
            onChangeText={handleChange("price")}
          />
          <TextInput
            style={[
              styles.textInput,
              { height: heightToDp(10), textAlignVertical: "top" },
            ]}
            value={values.description}
            placeholder="Description"
            multiline={true}
            numberOfLines={4}
            onChangeText={handleChange("description")}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Image Link"
            value={values.avatar}
            onChangeText={handleChange("avatar")}
          />
          <Text style={{ paddingHorizontal: widthToDp(2) }}>
            Selected Category: {selectedCategory}
          </Text>
          <ScrollView
            style={{ marginVertical: heightToDp(4), }}
            horizontal={true}
          >
            {categories.map((category, index) => {
              return (
                <Button
                  key={index}
                  onPress={() => {
                    setActiveCategory(category.name);
                  }}
                  buttonStyle={{
                    backgroundColor: category.isActive ? '#000': '#fff',
                    borderColor: category.isActive ? '#fff': '#000',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingVertical: 5,
                    marginHorizontal:3,
                  }}
                  title={category.name}
                  type={category.isActive ? "solid" : "outline"}
                />
              );
            })}
          </ScrollView>
          <Button
            onPress={() => {
              handleSubmit();
            }}
            style={{
              width: widthToDp(40),
              alignSelf: "center",
              marginBottom: heightToDp(4),
            }}
            loading={laoding}
            color="#000"
            title="Add Product"
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: heightToDp(5),
    marginHorizontal: widthToDp(2),
    marginVertical: widthToDp(5),
    paddingLeft:widthToDp(2),
  },
});

export default AddProduct;
