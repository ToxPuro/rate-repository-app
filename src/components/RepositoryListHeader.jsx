import React from 'react';
import Text from './Text';
import TextInput from './TextInput';
import { View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

const RepositoryListHeader = ({sortMethod, setSortMethod, keyword, setKeyword}) => {
  
  return(
    <View style={{backgroundColor: "#ffffff"}}>
      <TextInput
        style={styles.input}
        onChangeText={(keyword) => setKeyword(() => 'ze')}
        value={keyword}/>
      <Picker
        selectedValue={sortMethod}
        onValueChange={(itemValue, itemIndex) =>
        setSortMethod(itemValue)
        }>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>

  );
};

export default RepositoryListHeader;