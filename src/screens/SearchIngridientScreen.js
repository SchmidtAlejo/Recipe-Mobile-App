import React from 'react';
import { View } from 'react-native';
import { Text} from 'react-native-paper';
import Autocomplete from '../components/Autocomplete';

export default function SearchIngridientScreen({ navigation }) {
  return (
    <View>
      <Autocomplete navigation={navigation}/>
    </View>
  )
}
