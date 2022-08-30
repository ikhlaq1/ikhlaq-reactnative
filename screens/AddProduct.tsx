import { useRoute } from "@react-navigation/native";
import { Button, Text } from "@rneui/base";
import { Formik } from "formik";
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import apiService from '../services/api';
import Category from "../types/CategoryType";
import { heightToDp, widthToDp } from "../utils/responsive";

const AddProduct = () => {
  const [categories, setCategory] = useState<Array<Category>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const route = useRoute();
  const { product }: any = route.params;
  console.log(product);
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

  const setActiveCategory = (categoryName:string) => {
    let tempCategory = [...categories]
    tempCategory.map((cat)=>{
      if(cat.name === categoryName){
        cat.isActive = true
        setSelectedCategory(categoryName)
      }
      else{
        cat.isActive = false

      }
      setCategory(tempCategory)
    })
  };


const addProduct = (data:any) => {
    let finalData = data;
    finalData['developerEmail']='ikhlaq201@gmail.com'
    finalData['category']=selectedCategory
    console.log(finalData)
    apiService
      .addProduct(finalData)
      .then((response: any) => {
        console.log(response)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <Formik
      initialValues ={{ name: "", price: "",description:"",avatar:"", }}
      onSubmit={(values) => {
        console.log("submitted", values)
        addProduct(values)
      } }
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Product title"
            value={values.name}
            onChangeText={handleChange('name')}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Price"
            value={values.price}
            onChangeText={handleChange('price')}
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
            onChangeText={handleChange('description')}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Image Link"
            value={values.avatar}
            onChangeText={handleChange('avatar')}
          />
          <Text style={{ paddingHorizontal: widthToDp(2) }}>
            Selected Category: {selectedCategory}
          </Text>
          <ScrollView style={{marginVertical:heightToDp(3)}} horizontal={true}>
        {categories.map((category,index) => {
          return (
            <Button
            key={index}
              onPress={()=>{
                setActiveCategory(category.name)
              }}
              buttonStyle={{ marginHorizontal: 10, borderRadius: 5 }}
              title={category.name}
              type={category.isActive ? "solid" : "outline"}
            />
          );
        })}
      </ScrollView>
          <Button onPress={()=>{
              handleSubmit()
          }} style={{width:widthToDp(40),alignSelf:'center',marginBottom:heightToDp(4)}} color="#000" title="Add Product" />
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
  },
});

export default AddProduct;
