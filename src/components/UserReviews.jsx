import { useQuery } from '@apollo/client';
import React from 'react'
import { View, FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import { GET_REVIEWS } from '../graphql/queries'



const ItemSeparator = () => <View style={{height: 10}} />;

const UserReviews = () => {

  const { loading, data } = useQuery(GET_REVIEWS, {fetchPolicy: 'cache-and-network'});

  if(loading){
    return(
      <View>loading...</View>
    )
  }

  const reviews = data.authorizedUser ? data.authorizedUser.reviews.edges.map(edge =>  edge.node) : null;

  console.log(data);
  return(
    <FlatList
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item} header={item.repository.fullName}/>}
      keyExtractor={({id}) => id}
      ItemSeparatorComponent={ItemSeparator}/>
  )
}

export default UserReviews;