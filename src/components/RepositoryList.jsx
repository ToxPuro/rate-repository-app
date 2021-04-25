import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import { useHistory} from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;


export class RepositoryListContrainer extends React.Component {

  renderHeader = () => {
    const {sortMethod, setSortMethod, keyword, setKeyword} = this.props;
    return(
      <View style={{backgroundColor: "#ffffff"}}>
      <TextInput
        placeholder = "Search repositories"
        style={styles.input}
        onChangeText={(keyword) => setKeyword(() => keyword)}
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
    )
  }

  render(){
    const {repositories, onEndReach} = this.props;

    console.log(repositories);
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
  
    const renderItem = ({item}) => (
      <RepositoryItem repository={item}/>
    );
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.9}
        ListHeaderComponent = { this.renderHeader}
      />
    );
  };
  }


const RepositoryList = () => {
  const history = useHistory();
  const [sortMethod, setSortMethod] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [keywordValue] = useDebounce(keyword, 500);

  const {repositories, fetchMore} = useRepositories(sortMethod, keywordValue);

  const onEndReach = () => {
    console.log('end reached')
    fetchMore();
  }

  

  return <RepositoryListContrainer repositories={repositories} sortMethod={sortMethod} setSortMethod={setSortMethod} keyword={keyword} setKeyword={setKeyword} onEndReach={onEndReach}/>
}

export default RepositoryList;