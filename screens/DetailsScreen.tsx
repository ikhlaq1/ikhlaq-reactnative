import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';

const DetailScreen = () => {
  const route = useRoute();
  const { name, birthYear }:any = route.params;

  return (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 18, paddingBottom: 12 }}>Name: {name}</Text>
      <Text style={{ fontSize: 18 }}>Birth Year: {birthYear}</Text>
    </View>
  );
};

export default DetailScreen;