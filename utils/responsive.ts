import { Dimensions, PixelRatio } from 'react-native';

let {width, height} = Dimensions.get('window');
const widthToDp = (number:any) => {
  let geivenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * geivenWidth) / 100);
};

const heightToDp = (number:any) => {
  let geivenHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * geivenHeight) / 100);
};



export { widthToDp, heightToDp };
