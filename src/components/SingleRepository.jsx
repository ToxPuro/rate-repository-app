import React from 'react';
import Text from './Text';
import {FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import ReviewItem from './ReviewItem';




const ItemSeparator = () => <View style={{height: 10}} />;



const SingleRepository = () => {
  const { id } = useParams();
  const {repository, loading, fetchMore } = useRepository(id);
  if(loading){
    return(
      <Text>loading...</Text>
    )
  }
  const onEndReached = () => {
    console.log('review end reached');
    fetchMore();
  }
  const reviews = loading ? null : repository.reviews.edges.map(edge => edge.node);
  console.log(reviews);

  return(
    <FlatList
      data={reviews}
      renderItem={({ item }) => <Text><ReviewItem review={item} header={item.user.username}/></Text>}
      keyExtractor = {({id}) => id}
      ItemSeparatorComponent = {ItemSeparator}
      ListHeaderComponent = {() => <RepositoryItem repository={repository}/>}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}/>
      
  )
}



export default SingleRepository;