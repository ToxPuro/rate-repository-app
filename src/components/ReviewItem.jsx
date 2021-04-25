import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 3,
    borderColor: theme.colors.primary
  },
  avatarContainer: {
    flexGrow: 0,
  },
  infoContainer: {
    flexGrow: 1,
  },
});

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: '#ffffff'
  }
});


const Header = ({review, header}) => {
  const toDate = (date) => {
    const day = date.substring(8,10);
    const month = date.substring(5,7);
    const year = date.substring(0,4);
    return `${day}.${month}.${year}`
  }
  return(
    <View style={cardHeaderStyles.container}>
    <View style={cardHeaderStyles.avatarContainer}>
      <View style={cardHeaderStyles.avatar}>
        <Text style={{paddingLeft: 45/4, paddingTop: 45/4, color: theme.colors.primary}} >40</Text>
      </View>
    </View>
    <View style={cardHeaderStyles.infoContainer}>
      <Text fontWeight="bold" fontSize="subheading">{header}</Text>
      <Text color="textSecondary">{toDate(review.createdAt)}</Text>
    </View>
  </View>
  )
}

const ReviewItem = ({review, header}) => {
  return(
    <View style= {styles.container}>
        <Header review={review} header={header}/>
       <Text>{review.text}</Text>
    </View>
   
  )
}

export default ReviewItem;